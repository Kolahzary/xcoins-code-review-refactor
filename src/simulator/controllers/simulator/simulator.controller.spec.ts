import { Test, TestingModule } from '@nestjs/testing'
import { SimulatorService } from '../../services'
import { SimulatorController } from './simulator.controller'

describe('SimulatorController', () => {
  let controller: SimulatorController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SimulatorService,
          useFactory: (): Partial<SimulatorService> => {
            return {
              findAll: () => {
                return Promise.resolve([])
              },
              findByProfileId: () => {
                return Promise.resolve([])
              },
              create: (dto) => {
                return Promise.resolve(null)
              },
            }
          },
        },
      ],
      controllers: [SimulatorController],
    }).compile()

    controller = module.get<SimulatorController>(SimulatorController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
