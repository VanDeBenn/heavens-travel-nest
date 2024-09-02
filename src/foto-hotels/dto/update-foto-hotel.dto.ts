import { PartialType } from '@nestjs/swagger';
import { CreatefotoHotelsDto } from './create-foto-hotel.dto';

export class UpdateFotoHotelDto extends PartialType(CreatefotoHotelsDto) {}
