import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateProfileRequest {
  @IsString()
  name: string

  @IsString()
  nickname: string

  @IsEmail()
  email: string

  @IsNumber()
  @IsOptional()
  capital: number

  @IsString()
  @IsOptional()
  divisa: string

  @IsString()
  preferred_cryptocurrency: string
}
