import { IsNotEmpty } from 'class-validator';

export class CreatePhotoDestinationDto {
  @IsNotEmpty()
  pathPhoto: string;
  
  @IsNotEmpty()
  destinationId: string;
}
