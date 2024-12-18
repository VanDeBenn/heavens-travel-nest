import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoriServiceAmenityDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  hotelId: string;

  @IsOptional()
  roomHotelId: string;
}
