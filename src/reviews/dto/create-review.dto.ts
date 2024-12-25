import { IsAlpha, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsOptional()
  rating: number;

  @IsNotEmpty()
  comment: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  bookingDetailId: string;

  @IsNotEmpty()
  destinationId: string;

  @IsNotEmpty()
  hotelId: string;
}
