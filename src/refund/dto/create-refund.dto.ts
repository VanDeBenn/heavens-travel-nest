import { IsAlpha, isNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateRefundDto {
  @IsOptional()
  nameofBank: string;

  @IsOptional()
  bankAccountNumber: string;

  @IsOptional()
  accountHolder: string;

  @IsOptional()
  refundReason: string;

  @IsOptional()
  bookingId: string;

  @IsOptional()
  status: string;
}
