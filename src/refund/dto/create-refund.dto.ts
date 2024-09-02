import { IsAlpha, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  nameofBank: string;

  @IsNotEmpty()
  bankAccountNumber: string;

  @IsNotEmpty()
  refundReason: string;
}

