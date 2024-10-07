import { Module } from '@nestjs/common';
import { CategoriServiceAmenitysService } from './categories-service-amenities.service';
import { CategoriServiceAmenitysController } from './categories-service-amenities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriServiceAmenity } from './entities/categories-service-amenity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriServiceAmenity])],
  controllers: [CategoriServiceAmenitysController],
  providers: [CategoriServiceAmenitysService],
  exports: [CategoriServiceAmenitysService]
})
export class CategoriesServiceAmenitiesModule {}
