import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { Simulator } from '../../schemas'
import { SimulatorService } from './simulator.service'

describe('SimulatorService', () => {
  let service: SimulatorService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Simulator.name),
          useFactory: () => {
            return {
              find: jest.fn(),
            }
          },
        },
        SimulatorService,
      ],
    }).compile()

    service = module.get<SimulatorService>(SimulatorService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
