import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDestinationDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  priceAdult: number;

  @IsNotEmpty()
  priceChildren: number;

  @IsNotEmpty()
  maxCapacity: number;

  @IsNotEmpty()
  rating: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  address: string;

  @IsOptional()
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
