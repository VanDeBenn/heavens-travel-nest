import { IsAlpha, IsNotEmpty, IsNumber } from 'class-validator';


export class CreateBookingDto {
  @IsNotEmpty()
  customerName: string;

  @IsNotEmpty()
  customerEmail: string;

  @IsNotEmpty()
  CustomerPhoneNumber: number;

  @IsNotEmpty()
  guestName: string;

  @IsNotEmpty()
  guestEmail: string;

  @IsNotEmpty()
  guestPhoneNumber: number;

  @IsNotEmpty()
  paymentType: string;

  @IsNotEmpty()
  paymentDueDate: string;

  @IsNotEmpty()
  paymentAmount: number;

  @IsNotEmpty()
  totalPrice: number;

  @IsNotEmpty()
  statusPayment: string;

  @IsNotEmpty()
  fullFilment: string;
}

