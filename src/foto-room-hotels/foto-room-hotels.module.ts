import { Module } from '@nestjs/common';
import { PhotoRoomHotelsService } from './foto-room-hotels.service';
import { PhotoRoomHotelsController } from './foto-room-hotels.controller';
import { PhotoRoomHotel } from './entities/foto-room-hotel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomHotelsModule } from '#/room-hotels/room-hotels.module';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoRoomHotel]),RoomHotelsModule],
  controllers: [PhotoRoomHotelsController],
  providers: [PhotoRoomHotelsService],
  exports: [PhotoRoomHotelsService],
})
export class FotoRoomHotelsModule {}
