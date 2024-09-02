import { IsNotEmpty } from 'class-validator';

export class CreatefotoReportDto {
  @IsNotEmpty()
  pathPhoto: string;
}
