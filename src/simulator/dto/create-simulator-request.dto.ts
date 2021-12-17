import { IsDate, IsDateString, IsNumber, IsString } from 'class-validator'

export class CreateSimulatorRequest {
  @IsDateString()
  date_recorded: string

  @IsString()
  cryptocurrency: string

  @IsNumber()
  euros: number

  @IsNumber()
  price: number

  @IsNumber()
  quantity: number
}
