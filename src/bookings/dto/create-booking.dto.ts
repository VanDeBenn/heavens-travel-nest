import { IsAlpha, isNotEmpty, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';


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
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  priceDetail: number;

  @IsNotEmpty()
  paymentType: string;

  @IsNotEmpty()
  paymentDueDate: string;

  @IsNotEmpty()
  paymentAmount: number;

  @IsNotEmpty()
  tokenTransaction:number;

  @IsNotEmpty()
  totalPrice: number;

  @IsNotEmpty()
  statusPayment: string;

  @IsNotEmpty()
  fullFilment: string;
  
  @IsNotEmpty()
  userId: string;
  
  @IsOptional()
  cartId: string;
  
  @IsNotEmpty()
  destinationId: string;
  
  @IsNotEmpty()
  roomHotelId: string;
}

