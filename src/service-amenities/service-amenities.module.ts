import { Module } from '@nestjs/common';
import { ServiceAmenitysService } from './service-amenities.service';
import { ServiceAmenitysController } from './service-amenities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceAmenity } from './entities/service-amenity.entity';
import { CategoriesServiceAmenitiesModule } from '#/categories-service-amenities/categories-service-amenities.module';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceAmenity]), CategoriesServiceAmenitiesModule],
  controllers: [ServiceAmenitysController],
  providers: [ServiceAmenitysService],
  exports: [ServiceAmenitysService],
})
export class ServiceAmenitiesModule {}
