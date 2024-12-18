import { IsNotEmpty } from 'class-validator';

export class CreateNearbyLocationDto {
  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  distance: string;

  @IsNotEmpty()
  categoriesNearbyLocationId: string;

  @IsNotEmpty()
  hotelId: string;
}
