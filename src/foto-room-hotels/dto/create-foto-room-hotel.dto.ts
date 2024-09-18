import { IsNotEmpty } from 'class-validator';

export class CreatePhotoRoomHotelDto {
  @IsNotEmpty()
  pathPhoto: string;
}
