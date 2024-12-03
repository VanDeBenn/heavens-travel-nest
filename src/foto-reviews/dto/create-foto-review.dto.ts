import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePhotoReviewDto {
  @IsOptional()
  pathPhoto: string;

  @IsNotEmpty()
  reviewId: string;
}
