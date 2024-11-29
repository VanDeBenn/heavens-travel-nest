import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePhotoReportDto {
  @IsOptional()
  pathPhoto: string;

  @IsNotEmpty()
  reportId: string;
}
