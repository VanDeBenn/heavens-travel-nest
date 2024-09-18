import { Module } from '@nestjs/common';
import { PhotoHotelsService } from './foto-hotels.service';
import { PhotoHotelsController } from './foto-hotels.controller';
import { PhotoHotel } from './entities/foto-hotel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoHotel])],
  controllers: [PhotoHotelsController],
  providers: [PhotoHotelsService],
})
export class FotoHotelsModule {}
