import { Module } from '@nestjs/common';
import { CategoriServiceAmenitysService } from './categories-service-amenities.service';
import { CategoriServiceAmenitysController } from './categories-service-amenities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriServiceAmenity } from './entities/categories-service-amenity.entity';
import { HotelsModule } from '#/hotels/hotels.module';
import { RoomHotelsModule } from '#/room-hotels/room-hotels.module';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriServiceAmenity]), HotelsModule, RoomHotelsModule],
  controllers: [CategoriServiceAmenitysController],
  providers: [CategoriServiceAmenitysService],
  exports: [CategoriServiceAmenitysService]
})
export class CategoriesServiceAmenitiesModule {}
