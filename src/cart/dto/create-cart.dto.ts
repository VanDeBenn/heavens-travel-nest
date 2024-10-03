import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  quantity: Number;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  destinationId: string;

  @IsOptional()
  roomHotelId: string;
}
