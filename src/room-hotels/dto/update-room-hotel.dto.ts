import { PartialType } from '@nestjs/swagger';
import { CreateRoomHotelDto } from './create-room-hotel.dto';

export class UpdateRoomHotelDto extends PartialType(CreateRoomHotelDto) {}
