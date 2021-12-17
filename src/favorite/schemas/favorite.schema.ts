import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'

export type FavoriteDocument = Favorite & Document

@Schema({
  timestamps: true,
})
export class Favorite {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    index: true,
  })
  profile_id: string

  @Prop({
    type: String,
  })
  name: string

  @Prop([String])
  favorites: string[]
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite)
