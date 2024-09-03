import { IsAlpha, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReplyReviewDto {

  @IsNotEmpty()
  comment: string;
}

