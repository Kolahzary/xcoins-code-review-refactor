import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AllHttpExceptionsFilter } from './common';
import { configuration, validationSchema} from './config';

import { FavoriteModule } from './favorite/favorite.module';
import { ProfileModule } from './profile/profile.module';
import { SimulatorModule } from './simulator/simulator.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: validationSchema,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    FavoriteModule,
    ProfileModule,
    SimulatorModule
  ],
  controllers: [AppController],
  providers: [AllHttpExceptionsFilter],
})
export class AppModule {}
