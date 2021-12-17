import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FavoriteModule } from './favorite/favorite.module';
import { ProfileModule } from './profile/profile.module';
import { SimulatorModule } from './simulator/simulator.module';

@Module({
  imports: [FavoriteModule, ProfileModule, SimulatorModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
