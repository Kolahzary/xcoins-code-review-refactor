import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CreateSimulatorRequest } from '../../dto'
import { SimulatorService } from '../../services'

@Controller('api/simulator')
export class SimulatorController {
  constructor(private readonly simulatorService: SimulatorService) {}

  /**
   * Get all simulator records
   *
   * @returns List of simulator objects
   */
  @Get()
  getAll() {
    return this.simulatorService.findAll()
  }

  /**
   * Get all simulataors of a specific profile
   *
   * @param profileId Profile ID
   * @returns List of simlator objects
   */
  @Get(':profile_id')
  getByProfileId(@Param('profile_id') profileId: string) {
    return this.simulatorService.findByProfileId(profileId)
  }

  /**
   * Create a profile if it doesn't exist
   */
  @Post(':profile_id')
  createProfile(
    @Param('profile_id') profileId: string,
    @Body() request: CreateSimulatorRequest,
  ) {
    return this.simulatorService.create(profileId, request)
  }
}
