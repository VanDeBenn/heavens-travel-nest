import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { CitysModule } from '#/cities/cities.module';
import { City } from '#/cities/entities/city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel, City]), CitysModule],
  controllers: [HotelsController],
  providers: [HotelsService],
  exports: [HotelsService],
})
export class HotelsModule {}
