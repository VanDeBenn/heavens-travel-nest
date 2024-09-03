import { Module } from '@nestjs/common';
import { ServiceAmenitiesService } from './service-amenities.service';
import { ServiceAmenitiesController } from './service-amenities.controller';

@Module({
  controllers: [ServiceAmenitiesController],
  providers: [ServiceAmenitiesService]
})
export class ServiceAmenitiesModule {}
