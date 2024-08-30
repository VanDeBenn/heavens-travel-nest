import { IsNotEmpty } from 'class-validator';

export class CreateRoomHotelDto {
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  adult: number;

  @IsNotEmpty()
  children: number;

  @IsNotEmpty()
  bed: number;
}
