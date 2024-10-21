import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePhotoDestinationDto {
  @IsOptional()
  @IsNotEmpty()
  pathPhoto: string;

  @IsOptional()
  destinationId: string;
}
