import { IsAlpha, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  rating: number;

  @IsNotEmpty()
  comment: string;

  @IsNotEmpty()
  userId: string;
}

