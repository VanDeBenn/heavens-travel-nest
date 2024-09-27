import { IsNotEmpty } from 'class-validator';

export class CreatePhotoReviewDto {
  @IsNotEmpty()
  pathPhoto: string;

  @IsNotEmpty()
  reviewId: string;
}
