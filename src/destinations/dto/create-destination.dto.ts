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

  @IsNotEmpty()
  pathLocation: string;

  @IsOptional()
  cityId: string;
}
