import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCartDto {
  @IsOptional()
  quantityAdult: number;

  @IsOptional()
  quantityRoom: number;

  @IsOptional()
  quantityChildren: number;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  userId: string;

  @IsOptional()
  destinationId: string;

  @IsOptional()
  roomHotelId: string;

  @IsOptional()
  bookingId: string;
}
