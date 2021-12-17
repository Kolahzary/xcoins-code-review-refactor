import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '~/app.module'
import {
  AllHttpExceptionsFilter,
  HttpValidationException,
  JsendInterceptor,
} from '~/common'
import { MongoHelper } from './utils'
import { Profile, ProfileDocument } from '~/profile/schemas'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        validationError: {
          target: true,
          value: true,
        },
        exceptionFactory: (errors) => new HttpValidationException(errors),
      }),
    )

    const filter = app.get<AllHttpExceptionsFilter>(AllHttpExceptionsFilter)
    app.useGlobalFilters(filter)

    app.useGlobalInterceptors(new JsendInterceptor())

    await app.init()
  })

  afterEach(async () => {
    await MongoHelper.dropDatabaseAsync()
    await app.close()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(404)
  })

  describe('/api/profile', () => {
    const sampleProfile = {
      name: 'Shadman',
      nickname: 'sha',
      email: 'shadman.ko@gmail.com',
      preferred_cryptocurrency: 'ETH',
    }

    it('[GET] should return empty array', async () => {
      await request(app.getHttpServer())
        .get('/api/profile')
        .expect(200, { status: 'success', data: [] })
    })

    it('[POST] should return 400 fail for requests with validation error', async () => {
      await request(app.getHttpServer())
        .post('/api/profile')
        .send({
          test: 'anything...',
        })
        .expect(400, {
          status: 'fail',
          data: {
            name: 'name must be a string',
            nickname: 'nickname must be a string',
            email: 'email must be an email',
            preferred_cryptocurrency:
              'preferred_cryptocurrency must be a string',
          },
        })
    })

    it('[POST] should return 201 success for valid requests', async () => {
      await request(app.getHttpServer())
        .post('/api/profile')
        .send(sampleProfile)
        .expect(201)
    })

    describe('After profile create', () => {
      let createdProfile: any

      beforeEach(async () => {
        const response = await request(app.getHttpServer())
          .post('/api/profile')
          .send(sampleProfile)
          .expect(201)

        createdProfile = response.body.data
      })

      it('[GET] should return created profile', async () => {
        const response = await request(app.getHttpServer())
          .get('/api/profile')
          .expect(200)

        expect(response.body.status).toEqual('success')
        expect(response.body.data).toHaveLength(1)

        expect(response.body.data[0].email).toEqual(sampleProfile.email)
      })

      it('[POST] should return error for duplicate record', async () => {
        await request(app.getHttpServer())
          .post('/api/profile')
          .send(sampleProfile)
          .expect(500)
      })

      describe('/api/favorite', () => {
        it('[GET] should return empty array', async () => {
          await request(app.getHttpServer())
            .get('/api/favorite')
            .expect(200, { status: 'success', data: [] })
        })

        it('[GET /:profile-id] should return empty array', async () => {
          await request(app.getHttpServer())
            .get(`/api/favorite/${createdProfile._id}`)
            .expect(200, { status: 'success', data: [] })
        })
      })

      describe('/api/simulator', () => {
        const sampleSimulator = {
          date_recorded: '2021-12-17T22:50:37.910Z',
          cryptocurrency: 'ETH',
          euros: 100,
          price: 10,
          quantity: 10,
        }

        it('[GET] should return empty array', async () => {
          await request(app.getHttpServer())
            .get('/api/simulator')
            .expect(200, { status: 'success', data: [] })
        })

        it('[POST /:profile_id] should return 400 fail for requests with validation error', async () => {
          await request(app.getHttpServer())
            .post(`/api/simulator/${createdProfile._id}`)
            .send({
              test: 'anything...',
            })
            .expect(400, {
              status: 'fail',
              data: {
                date_recorded:
                  'date_recorded must be a valid ISO 8601 date string',
                cryptocurrency: 'cryptocurrency must be a string',
                euros:
                  'euros must be a number conforming to the specified constraints',
                price:
                  'price must be a number conforming to the specified constraints',
                quantity:
                  'quantity must be a number conforming to the specified constraints',
              },
            })
        })

        it('[POST /:profile_id] should return 201 success for valid requests', async () => {
          await request(app.getHttpServer())
            .post(`/api/simulator/${createdProfile._id}`)
            .send(sampleSimulator)
            .expect(201)
        })

        describe('After simulator create', () => {
          beforeEach(async () => {
            await request(app.getHttpServer())
              .post(`/api/simulator/${createdProfile._id}`)
              .send(sampleSimulator)
              .expect(201)
          })

          it('[GET] should return created simulator', async () => {
            const response = await request(app.getHttpServer())
              .get('/api/simulator')
              .expect(200)

            expect(response.body.status).toEqual('success')
            expect(response.body.data).toHaveLength(1)

            expect(response.body.data[0].date_recorded).toEqual(
              sampleSimulator.date_recorded,
            )
          })
        })
      })
    })
  })
})
