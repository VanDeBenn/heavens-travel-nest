import { IsNotEmpty } from 'class-validator';

export class CreatePhotoReportDto {
  @IsNotEmpty()
  pathPhoto: string;

  @IsNotEmpty()
  reportId: string;
}
