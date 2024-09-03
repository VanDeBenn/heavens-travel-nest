import { PartialType } from '@nestjs/swagger';
import { CreateCountrysDto } from './create-country.dto';

export class UpdateCountryDto extends PartialType(CreateCountrysDto) {}
