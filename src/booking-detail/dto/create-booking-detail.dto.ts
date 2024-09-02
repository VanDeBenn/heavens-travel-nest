import { IsAlpha, IsNotEmpty, IsNumber } from 'class-validator';


export class CreateBookingDetailDto {
  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  orderStatus: string;
}

