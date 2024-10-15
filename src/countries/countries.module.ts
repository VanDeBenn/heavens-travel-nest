import { Module } from '@nestjs/common';
import { CountrysService } from './countries.service';
import { CountrysController } from './countries.controller';
import { Country } from './entities/country.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Country]), HttpModule],
  controllers: [CountrysController],
  providers: [CountrysService],
  exports: [CountrysService],
})
export class CountriesModule {}
