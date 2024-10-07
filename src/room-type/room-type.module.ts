import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomType } from './entities/room-type.entity';
import { RoomTypeController } from './room-type.controller';
import { RoomTypeService } from './room-type.service';
import { RoomHotelsModule } from '#/room-hotels/room-hotels.module';

@Module({
  imports: [TypeOrmModule.forFeature([RoomType]), RoomHotelsModule],
  controllers: [RoomTypeController],
  providers: [RoomTypeService],
  exports: [RoomTypeService],
})
export class RoomTypeModule {}
