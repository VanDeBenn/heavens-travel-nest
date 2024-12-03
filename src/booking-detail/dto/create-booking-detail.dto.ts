import {
  IsAlpha,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateBookingDetailDto {
  @IsOptional()
  priceDetail: number;

  @IsOptional()
  totalPrice: number;

  @IsOptional()
  orderStatus: string;

  @IsOptional()
  bookingId: string;

  @IsOptional()
  cartId: string;

  @IsOptional()
  @IsArray()
  selectedCartIds: string[];

  @IsOptional()
  reportId: string;
}
