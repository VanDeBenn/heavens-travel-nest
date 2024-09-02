import { PartialType } from '@nestjs/swagger';
import { CreateFotoRoomHotelDto } from './create-foto-room-hotel.dto';

export class UpdateFotoRoomHotelDto extends PartialType(CreateFotoRoomHotelDto) {}
