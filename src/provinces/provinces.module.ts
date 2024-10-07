import { Module } from '@nestjs/common';
import { ProvinceService } from './provinces.service';
import { ProvinceController } from './provinces.controller';
import { Province } from './entities/province.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Province])],
  controllers: [ProvinceController],
  providers: [ProvinceService],
  exports: [ProvinceService],
})
export class ProvincesModule {}
