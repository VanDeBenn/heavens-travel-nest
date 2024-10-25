import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  quantityAdult: number;

  @IsNotEmpty()
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
