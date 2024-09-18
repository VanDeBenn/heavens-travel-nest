import { PartialType } from '@nestjs/swagger';
import { CreatePhotoReviewDto } from './create-foto-review.dto';

export class UpdatePhotoReviewDto extends PartialType(CreatePhotoReviewDto) {}
