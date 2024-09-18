import { PartialType } from '@nestjs/swagger';
import { CreatePhotoDestinationDto } from './create-foto-destination.dto';

export class UpdatePhotoDestinationDto extends PartialType(CreatePhotoDestinationDto) {}
