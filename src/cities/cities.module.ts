import { Module } from '@nestjs/common';
import { CitysService } from './cities.service';
import { CitysController } from './cities.controller';
import { City } from './entities/city.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  controllers: [CitysController],
  providers: [CitysService],
})
export class CitiesModule {}
