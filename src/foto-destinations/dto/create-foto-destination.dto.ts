import { IsNotEmpty } from 'class-validator';

export class CreatefotoDestinationDto {
  @IsNotEmpty()
  pathPhoto: string;
}
