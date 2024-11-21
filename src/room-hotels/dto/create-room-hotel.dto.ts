import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRoomHotelDto {
  @IsOptional()
  roomType: string;

  @IsOptional()
  price: number;

  @IsOptional()
  adult: number;

  @IsOptional()
  children: number;

  @IsOptional()
  numberRoom: number;

  @IsOptional()
  singleBed: number;

  @IsOptional()
  doubleBed: number;

  @IsOptional()
  queenBed: number;

  @IsOptional()
  kingBed: number;

  @IsNotEmpty()
  hotelId: string;
}
