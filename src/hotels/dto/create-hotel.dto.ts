import { IsNotEmpty, IsOptional } from 'class-validator';

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

  @IsOptional()
  cityName: string;

  @IsOptional()
  provinceName: string;

  @IsOptional()
  countryName: string;
}
