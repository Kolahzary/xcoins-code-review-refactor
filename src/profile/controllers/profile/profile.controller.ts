import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { CreateProfileRequest } from '../../dto';

@Controller('api/profile')
export class ProfileController {
    /**
     * Get all profile records
     * 
     * @returns List of profile objects
     */
    @Get()
    getAll() {
        // TODO
        return []
    }
    
    /**
     * Create a profile if it doesn't exist
     */
    @Post()
    createProfile(@Body() request: CreateProfileRequest) {
        Logger.log(request)
        // TODO
    }
}