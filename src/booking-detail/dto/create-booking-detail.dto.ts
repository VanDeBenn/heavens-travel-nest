import { IsAlpha, IsNotEmpty, IsNumber } from 'class-validator';


export class CreateBookingDetailDto {
  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  priceDetail: number;

  @IsNotEmpty()
  orderStatus: string;
 
  @IsNotEmpty()
  cartId: string;
 
  @IsNotEmpty()
  destinationId: string;
  
  @IsNotEmpty()
  roomHotelId: string;
  
  @IsNotEmpty()
  bookingId: string;
}

