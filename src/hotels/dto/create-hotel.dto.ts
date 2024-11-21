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

  @IsOptional()
  cityId: string;

  @IsOptional()
  cityName: string;

  @IsOptional()
  provinceName: string;

  @IsOptional()
  countryName: string;
}
