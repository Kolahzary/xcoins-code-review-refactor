import { Controller, Get, Param } from '@nestjs/common'
import { FavoriteService } from '../../services'

@Controller('api/favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  /**
   * Get all favorite records
   *
   * @returns List of favorite objects
   */
  @Get()
  getAll() {
    return this.favoriteService.findAll()
  }

  /**
   * Get all favorites of a specific profile
   *
   * @param profileId Profile ID
   * @returns List of favorite objects
   */
  @Get(':profile_id')
  getByProfileId(@Param('profile_id') profileId: string) {
    return this.favoriteService.findByProfileId(profileId)
  }
}
