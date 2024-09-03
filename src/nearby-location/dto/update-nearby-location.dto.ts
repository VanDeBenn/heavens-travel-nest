import { PartialType } from '@nestjs/swagger';
import { CreateNearbyLocationDto } from './create-nearby-location.dto';

export class UpdateNearbyLocationDto extends PartialType(CreateNearbyLocationDto) {}
