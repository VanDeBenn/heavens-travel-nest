import { Module } from '@nestjs/common';
import { ServiceAmenitysService } from './service-amenities.service';
import { ServiceAmenitysController } from './service-amenities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceAmenity } from './entities/service-amenity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceAmenity])],
  controllers: [ServiceAmenitysController],
  providers: [ServiceAmenitysService]
})
export class ServiceAmenitiesModule {}
