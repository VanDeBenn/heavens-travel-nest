import { IsAlpha, isNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateBookingDto {
  @IsOptional()
  customerName: string;

  @IsOptional()
  customerEmail: string;

  @IsOptional()
  customerPhoneNumber: string;

  @IsOptional()
  guestName: string;

  @IsOptional()
  guestEmail: string;

  @IsOptional()
  guestPhoneNumber: string;

  @IsOptional()
  startDate: Date;

  @IsOptional()
  endDate: Date;

  @IsOptional()
  quantity: number;

  @IsOptional()
  priceDetail: number;

  @IsOptional()
  paymentType: string;

  @IsOptional()
  paymentDueDate: string;

  @IsOptional()
  paymentAmount: number;

  @IsOptional()
  tokenTransaction: number;

  @IsOptional()
  totalPrice: number;

  @IsOptional()
  statusPayment: string;

  @IsOptional()
  fullFilment: string;

  @IsOptional()
  userId: string;

  @IsOptional()
  cartId: string;

  @IsOptional()
  destinationId: string;

  @IsOptional()
  roomHotelId: string;
}
