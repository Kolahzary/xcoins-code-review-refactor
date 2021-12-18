import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { Favorite } from '../../schemas'
import { FavoriteService } from './favorite.service'

describe('FavoriteService', () => {
  let service: FavoriteService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Favorite.name),
          useFactory: () => {
            return {
              find: jest.fn(),
            }
          },
        },
        FavoriteService,
      ],
    }).compile()

    service = module.get<FavoriteService>(FavoriteService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
