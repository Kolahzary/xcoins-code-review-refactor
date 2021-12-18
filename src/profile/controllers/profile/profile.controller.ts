import { Body, Controller, Get, Post } from '@nestjs/common'
import { ProfileService } from '../../services'
import { CreateProfileRequest } from '../../dto'

@Controller('api/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  /**
   * Get all profile records
   *
   * @returns List of profile objects
   */
  @Get()
  getAll() {
    return this.profileService.findAll()
  }

  /**
   * Create a profile if it doesn't exist
   */
  @Post()
  createProfile(@Body() request: CreateProfileRequest) {
    return this.profileService.create(request)
  }
}
