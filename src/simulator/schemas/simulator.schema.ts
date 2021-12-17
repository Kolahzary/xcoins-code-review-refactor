import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'

export type SimulatorDocument = Simulator & Document

@Schema({
  timestamps: true,
})
export class Simulator {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    index: true,
  })
  profile_id: string

  @Prop({
    type: Date,
  })
  date_recorded: Date

  @Prop({
    type: String,
  })
  cryptocurrency: string

  @Prop({
    type: Number,
  })
  euros: number

  @Prop({
    type: Number,
  })
  price: number

  @Prop({
    type: Number,
  })
  quantity: number
}

export const SimulatorSchema = SchemaFactory.createForClass(Simulator)
