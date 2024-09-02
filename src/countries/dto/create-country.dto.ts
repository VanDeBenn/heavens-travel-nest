import { IsNotEmpty } from 'class-validator';

export class CreateCountrysDto {
  @IsNotEmpty()
  name: string;
}
