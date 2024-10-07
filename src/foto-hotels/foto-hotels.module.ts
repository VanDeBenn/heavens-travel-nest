import { Module } from '@nestjs/common';
import { PhotoHotelsService } from './foto-hotels.service';
import { PhotoHotelsController } from './foto-hotels.controller';
import { PhotoHotel } from './entities/foto-hotel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelsModule } from '#/hotels/hotels.module';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoHotel]),HotelsModule],
  controllers: [PhotoHotelsController],
  providers: [PhotoHotelsService],
  exports: [PhotoHotelsService],
})
export class FotoHotelsModule {}
