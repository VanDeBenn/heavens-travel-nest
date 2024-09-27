import { IsNotEmpty } from 'class-validator';

export class CreatePhotoHotelDto {
  @IsNotEmpty()
  pathPhoto: string;

  @IsNotEmpty()
  hotelId: string;
}
