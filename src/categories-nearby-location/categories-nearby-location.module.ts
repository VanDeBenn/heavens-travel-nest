import { Module } from '@nestjs/common';
import { CategoriesNearbyLocationService } from './categories-nearby-location.service';
import { CategoriesNearbyLocationController } from './categories-nearby-location.controller';

@Module({
  controllers: [CategoriesNearbyLocationController],
  providers: [CategoriesNearbyLocationService]
})
export class CategoriesNearbyLocationModule {}
