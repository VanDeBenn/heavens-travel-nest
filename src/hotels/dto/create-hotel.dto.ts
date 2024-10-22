import { IsNotEmpty } from 'class-validator';

export class CreateHotelDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  rating: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  pathLocation: string;

  @IsNotEmpty()
  cityId: string;
}
