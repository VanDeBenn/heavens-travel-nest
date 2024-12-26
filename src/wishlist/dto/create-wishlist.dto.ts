import { IsAlpha, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateWishlistDto {
  @IsNotEmpty()
  userId: string;

  @IsOptional()
  destinationId: string;

  @IsOptional()
  hotelId: string;
}
