import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePhotoHotelDto {
  @IsOptional()
  pathPhoto: string;

  @IsNotEmpty()
  hotelId: string;
}
