import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SimulatorController } from './controllers'
import { Simulator, SimulatorSchema } from './schemas'
import { SimulatorService } from './services'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Simulator.name, schema: SimulatorSchema },
    ]),
  ],
  controllers: [SimulatorController],
  providers: [SimulatorService],
})
export class SimulatorModule {}
