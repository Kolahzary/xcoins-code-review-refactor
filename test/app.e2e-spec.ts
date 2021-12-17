import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '~/app.module';
import { AllHttpExceptionsFilter, HttpValidationException, JsendInterceptor } from '~/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      validationError: {
        target: true,
        value: true,
      },
      exceptionFactory: (errors) => new HttpValidationException(errors),
    }));


    const filter = app.get<AllHttpExceptionsFilter>(AllHttpExceptionsFilter);
    app.useGlobalFilters(filter);

    app.useGlobalInterceptors(new JsendInterceptor());

    await app.init();
  });

  afterEach(async () => {
    await app.close()
  })

  describe('/api/profile', () => {
    it('[GET] should return empty array', async () => {
      await request(app.getHttpServer())
        .get('/api/profile')
        .expect(200, { status: 'success', data: [] })
    })

    it('[POST] should return 400 fail for requests with validation error', async () => {
      await request(app.getHttpServer())
        .post('/api/profile')
        .send({
          test: 'anything...'
        })
        .expect(400, {
          status: 'fail',
          data: {
            name: 'name must be a string',
            nickname: 'nickname must be a string',
            email: 'email must be an email',
            preferred_cryptocurrency: 'preferred_cryptocurrency must be a string'
          }
        })
    })

    it('[POST] should return 201 success for valid requests', async () => {
      await request(app.getHttpServer())
        .post('/api/profile')
        .send({
          name: 'Shadman',
          nickname: 'sha',
          email: 'shadman.ko@gmail.com',
          preferred_cryptocurrency: 'ETH'
        })
        .expect(201, {
          status: 'success',
          data: null
        })
    })
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(404);
  });
});