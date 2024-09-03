import { Module } from '@nestjs/common';
import { CategoriesServiceAmenitiesService } from './categories-service-amenities.service';
import { CategoriesServiceAmenitiesController } from './categories-service-amenities.controller';

@Module({
  controllers: [CategoriesServiceAmenitiesController],
  providers: [CategoriesServiceAmenitiesService]
})
export class CategoriesServiceAmenitiesModule {}
