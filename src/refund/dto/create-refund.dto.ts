import { IsAlpha, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRefundDto {
  @IsNotEmpty()
  nameofBank: string;

  @IsNotEmpty()
  bankAccountNumber: string;

  @IsNotEmpty()
  accountHolder: string;

  @IsNotEmpty()
  refundReason: string;

  @IsNotEmpty()
  bookingId: string;
}
