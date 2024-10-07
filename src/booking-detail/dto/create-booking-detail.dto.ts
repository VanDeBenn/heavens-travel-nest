import { IsAlpha, IsNotEmpty, IsNumber } from 'class-validator';


export class CreateBookingDetailDto {
  @IsNotEmpty()
  priceDetail: number;

  @IsNotEmpty()
  totalPrice: number;

  @IsNotEmpty()
  orderStatus: string;
  
  @IsNotEmpty()
  bookingId: string;
}

