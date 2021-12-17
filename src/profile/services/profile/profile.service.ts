import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Profile, ProfileDocument } from '../../schemas'
import { CreateProfileRequest } from '~/profile/dto'

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}

  async findAll(): Promise<Profile[]> {
    return this.profileModel.find().lean()
  }

  async create(dto: CreateProfileRequest): Promise<Profile> {
    const createdProfile = new this.profileModel(dto)
    return createdProfile.save()
  }
}
