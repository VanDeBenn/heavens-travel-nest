import { IsAlpha, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReplyReviewDto {

  @IsNotEmpty()
  comment: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  reviewId: string;
}

