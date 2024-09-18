import { IsNotEmpty } from 'class-validator';

export class CreatePhotoReportDto {
  @IsNotEmpty()
  pathPhoto: string;
}
