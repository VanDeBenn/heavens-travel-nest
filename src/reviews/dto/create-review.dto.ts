import { IsAlpha, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  rating: string;

  @IsNotEmpty()
  comment: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  bookingDetailId: string;
}
