import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateSimulatorRequest } from '../../dto'
import { Simulator, SimulatorDocument } from '../../schemas'

@Injectable()
export class SimulatorService {
  constructor(
    @InjectModel(Simulator.name)
    private simulatorModel: Model<SimulatorDocument>,
  ) {}

  async findAll(): Promise<Simulator[]> {
    return await this.simulatorModel.find().lean()
  }

  async findByProfileId(profileId: string): Promise<Simulator[]> {
    return await this.simulatorModel
      .find({
        profile_id: profileId,
      })
      .lean()
  }

  async create(
    profileId: string,
    dto: CreateSimulatorRequest,
  ): Promise<Simulator> {
    const createdSimulator = new this.simulatorModel({
      ...dto,
      profile_id: profileId,
    })
    return await createdSimulator.save()
  }
}
