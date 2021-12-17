import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { FavoriteController } from './controllers'
import { Favorite, FavoriteSchema } from './schemas'
import { FavoriteService } from './services'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Favorite.name, schema: FavoriteSchema },
    ]),
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
