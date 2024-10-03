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
  pathMapLocation: string;

  @IsNotEmpty()
  districtId: string;
}
