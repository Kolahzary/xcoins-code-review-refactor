import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Favorite, FavoriteDocument } from '../../schemas'

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<FavoriteDocument>,
  ) {}

  async findAll(): Promise<Favorite[]> {
    return await this.favoriteModel.find().lean()
  }

  async findByProfileId(profileId: string): Promise<Favorite[]> {
    return await this.favoriteModel
      .find({
        profile_id: profileId,
      })
      .lean()
  }
}
