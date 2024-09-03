import { Module } from '@nestjs/common';
import { FotoRoomHotelsService } from './foto-room-hotels.service';
import { FotoRoomHotelsController } from './foto-room-hotels.controller';
import { PhotoRoomHotel } from './entities/foto-room-hotel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoRoomHotel])],
  controllers: [FotoRoomHotelsController],
  providers: [FotoRoomHotelsService],
})
export class FotoRoomHotelsModule {}
