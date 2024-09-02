import { PartialType } from '@nestjs/swagger';
import { CreatefotoDestinationDto } from './create-foto-destination.dto';

export class UpdateFotoDestinationDto extends PartialType(CreatefotoDestinationDto) {}
