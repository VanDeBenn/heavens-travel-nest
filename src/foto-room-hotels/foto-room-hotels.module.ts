import { Module } from '@nestjs/common';
import { FotoRoomHotelsService } from './foto-room-hotels.service';
import { FotoRoomHotelsController } from './foto-room-hotels.controller';

@Module({
  controllers: [FotoRoomHotelsController],
  providers: [FotoRoomHotelsService]
})
export class FotoRoomHotelsModule {}
