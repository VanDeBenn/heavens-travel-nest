import { PartialType } from '@nestjs/swagger';
import { CreatePhotoHotelDto } from './create-foto-hotel.dto';

export class UpdatePhotoHotelDto extends PartialType(CreatePhotoHotelDto) {}
