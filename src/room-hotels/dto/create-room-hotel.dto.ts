import { IsOptional } from 'class-validator';

export class CreateRoomHotelDto {
  // @IsOptional()
  // numberRoom: number;

  @IsOptional()
  price: number;

  // @IsOptional()
  // adult: number;

  // @IsOptional()
  // children: number;

  // @IsOptional()
  // singleBed: number;

  // @IsOptional()
  // doubleBed: number;

  // @IsOptional()
  // queenBed: number;

  // @IsOptional()
  // kingBed: number;

  // @IsOptional()
  // hotelId: string;
}
