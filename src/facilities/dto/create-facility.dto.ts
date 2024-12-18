import { IsNotEmpty } from 'class-validator';

export class CreateFacilityDto {
  @IsNotEmpty()
  hotelId: string;

  // @IsNotEmpty()
  // categoriesServiceAmenitiesId: string;

  @IsNotEmpty()
  serviceAmenitiesId: string;

  @IsNotEmpty()
  status: boolean;
}
