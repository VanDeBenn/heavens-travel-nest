import { Module } from '@nestjs/common';
import { RoomHotelsService } from './room-hotels.service';
import { RoomHotelsController } from './room-hotels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomHotel } from './entities/room-hotel.entity';
import { HotelsModule } from '#/hotels/hotels.module';

@Module({
  imports: [TypeOrmModule.forFeature([RoomHotel]), HotelsModule],
  controllers: [RoomHotelsController],
  providers: [RoomHotelsService],
  exports: [RoomHotelsService],
})
export class RoomHotelsModule {}
