import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePhotoRoomHotelDto {
  @IsOptional()
  pathPhoto: string;

  @IsNotEmpty()
  roomHotelId: string;
}
