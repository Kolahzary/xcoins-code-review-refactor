import { Test, TestingModule } from '@nestjs/testing'
import { FavoriteService } from '../../services'
import { FavoriteController } from './favorite.controller'

describe('FavoriteController', () => {
  let controller: FavoriteController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: FavoriteService,
          useFactory: (): Partial<FavoriteService> => {
            return {
              findAll: () => {
                return Promise.resolve([])
              },
              findByProfileId: () => {
                return Promise.resolve([])
              },
            }
          },
        },
      ],
      controllers: [FavoriteController],
    }).compile()

    controller = module.get<FavoriteController>(FavoriteController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
