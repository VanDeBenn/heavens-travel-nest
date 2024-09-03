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
  singleBed: number;

  @IsNotEmpty()
  doubleBed: number;

  @IsNotEmpty()
  queenBed: number;

  @IsNotEmpty()
  kingBed: number;

}
