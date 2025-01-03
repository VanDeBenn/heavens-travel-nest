import { Module } from '@nestjs/common';
import { CategoriesNearbyLocationsService } from './categories-nearby-location.service';
import { CategoriesNearbyLocationsController } from './categories-nearby-location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesNearbyLocation } from './entities/categories-nearby-location.entity';
import { HotelsModule } from '#/hotels/hotels.module';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesNearbyLocation]), HotelsModule],
  controllers: [CategoriesNearbyLocationsController],
  providers: [CategoriesNearbyLocationsService],
  exports: [CategoriesNearbyLocationsService, TypeOrmModule],
})
export class CategoriesNearbyLocationModule {}
