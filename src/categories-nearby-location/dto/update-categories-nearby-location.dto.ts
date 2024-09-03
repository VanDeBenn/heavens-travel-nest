import { PartialType } from '@nestjs/swagger';
import { CreateCategoriesNearbyLocationDto } from './create-categories-nearby-location.dto';

export class UpdateCategoriesNearbyLocationDto extends PartialType(CreateCategoriesNearbyLocationDto) {}
