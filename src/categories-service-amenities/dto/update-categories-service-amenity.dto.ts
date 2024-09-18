import { PartialType } from '@nestjs/swagger';
import { CreateCategoriServiceAmenityDto } from './create-categories-service-amenity.dto';

export class UpdateCategoriesServiceAmenityDto extends PartialType(CreateCategoriServiceAmenityDto) {}
