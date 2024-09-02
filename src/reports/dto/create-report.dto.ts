import { IsAlpha, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  pathPhoto: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  replyReport: string;
}

