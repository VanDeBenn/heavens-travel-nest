import { PartialType } from '@nestjs/swagger';
import { CreateCategoriesServiceAmenityDto } from './create-categories-service-amenity.dto';

export class UpdateCategoriesServiceAmenityDto extends PartialType(CreateCategoriesServiceAmenityDto) {}
