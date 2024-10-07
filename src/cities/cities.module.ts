import { Module } from '@nestjs/common';
import { CitysService } from './cities.service';
import { CitysController } from './cities.controller';
import { City } from './entities/city.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvincesModule } from '#/provinces/provinces.module';

@Module({
  imports: [TypeOrmModule.forFeature([City]), ProvincesModule],
  controllers: [CitysController],
  providers: [CitysService],
  exports: [CitysService],
})
export class CitiesModule {}
