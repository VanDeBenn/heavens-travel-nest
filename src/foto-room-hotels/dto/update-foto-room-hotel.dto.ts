import { PartialType } from '@nestjs/swagger';
import { CreatePhotoRoomHotelDto } from './create-foto-room-hotel.dto';

export class UpdatePhotoRoomHotelDto extends PartialType(CreatePhotoRoomHotelDto) {}
