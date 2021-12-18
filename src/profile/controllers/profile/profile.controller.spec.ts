import { Test, TestingModule } from '@nestjs/testing'
import { ProfileService } from '../../services'
import { ProfileController } from './profile.controller'

describe('ProfileController', () => {
  let controller: ProfileController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProfileService,
          useFactory: (): Partial<ProfileService> => {
            return {
              findAll: () => {
                return Promise.resolve([])
              },
              create: (dto) => {
                return Promise.resolve(null)
              },
            }
          },
        },
      ],
      controllers: [ProfileController],
    }).compile()

    controller = module.get<ProfileController>(ProfileController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
