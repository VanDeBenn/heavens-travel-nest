import { Module } from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { FacilitiesController } from './facilities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facility } from './entities/facility.entity';
import { HotelsModule } from '#/hotels/hotels.module';
import { ServiceAmenitiesModule } from '#/service-amenities/service-amenities.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Facility]),
    HotelsModule,
    ServiceAmenitiesModule,
  ],
  controllers: [FacilitiesController],
  providers: [FacilitiesService],
})
export class FacilitiesModule {}
