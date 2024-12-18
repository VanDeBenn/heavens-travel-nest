import { Module } from '@nestjs/common';
import { NearbyLocationService } from './nearby-location.service';
import { NearbyLocationController } from './nearby-location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NearbyLocation } from './entities/nearby-location.entity';
import { CategoriesFaqsModule } from '#/categories-faqs/categories-faqs.module';
import { CategoriesNearbyLocationModule } from '#/categories-nearby-location/categories-nearby-location.module';
import { HotelsModule } from '#/hotels/hotels.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NearbyLocation]),
    CategoriesNearbyLocationModule,
    HotelsModule,
  ],
  controllers: [NearbyLocationController],
  providers: [NearbyLocationService],
  exports: [NearbyLocationService],
})
export class NearbyLocationModule {}
