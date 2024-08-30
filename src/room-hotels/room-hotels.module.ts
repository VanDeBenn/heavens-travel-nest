import { Module } from '@nestjs/common';
import { RoomHotelsService } from './room-hotels.service';
import { RoomHotelsController } from './room-hotels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomHotel } from './entities/room-hotel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomHotel])],
  controllers: [RoomHotelsController],
  providers: [RoomHotelsService],
})
export class RoomHotelsModule {}
