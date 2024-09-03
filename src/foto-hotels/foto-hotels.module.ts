import { Module } from '@nestjs/common';
import { FotoHotelsService } from './foto-hotels.service';
import { FotoHotelsController } from './foto-hotels.controller';
import { PhotoHotel } from './entities/foto-hotel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoHotel])],
  controllers: [FotoHotelsController],
  providers: [FotoHotelsService],
})
export class FotoHotelsModule {}
