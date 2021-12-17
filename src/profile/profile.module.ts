import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProfileController } from './controllers';
import { Profile, ProfileSchema } from './schemas';
import { ProfileService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }])
  ],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
