import { IsAlpha, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  rating: number;

  @IsNotEmpty()
  comment: string;

  @IsNotEmpty()
  userId: string;

  @IsOptional()
  bookingDetailId: string;

  @IsOptional()
  destinationId: string;

  @IsOptional()
  hotelId: string;
}
