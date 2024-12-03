import { IsAlpha, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  email: string;

  @IsOptional()
  pathPhoto: string;

  @IsOptional()
  replyReport: string;

  @IsNotEmpty()
  userId: string;

  @IsOptional()
  bookingDetailId: string;

  @IsOptional()
  bookingId: string;
}
