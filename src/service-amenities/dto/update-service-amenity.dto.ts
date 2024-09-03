import { PartialType } from '@nestjs/swagger';
import { CreateServiceAmenityDto } from './create-service-amenity.dto';

export class UpdateServiceAmenityDto extends PartialType(CreateServiceAmenityDto) {}
