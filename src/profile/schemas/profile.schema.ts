import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ProfileDocument = Profile & Document

@Schema({
  timestamps: true,
})
export class Profile {
  @Prop({
    type: String,
  })
  name: string

  @Prop({
    type: String,
  })
  nickname: string

  @Prop({
    type: String,
    unique: true,
    index: true,
  })
  email: string

  @Prop({
    type: Number,
  })
  capital: number

  @Prop({
    type: String,
  })
  divisa: string

  @Prop({
    type: String,
  })
  prefered_cryptocurrency: string
}

export const ProfileSchema = SchemaFactory.createForClass(Profile)
