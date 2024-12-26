import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateNearbyLocationDto {
  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  distance: string;

  @IsOptional()
  categoriesNearbyLocationId: string;

  @IsNotEmpty()
  hotelId: string;
}
