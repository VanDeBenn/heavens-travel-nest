import { IsNotEmpty } from 'class-validator';

export class CreateProvinceDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  countryId: string;
}
