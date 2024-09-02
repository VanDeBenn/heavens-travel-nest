import { IsNotEmpty } from 'class-validator';

export class CreatefotoHotelsDto {
  @IsNotEmpty()
  pathPhoto: string;
}
