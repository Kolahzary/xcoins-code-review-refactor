import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AllHttpExceptionsFilter } from './common';
import { configuration } from './config/configuration';
import { validationSchema } from './config/validation';
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
    FavoriteModule, ProfileModule, SimulatorModule],
  controllers: [AppController],
  providers: [AllHttpExceptionsFilter],
})
export class AppModule {}
