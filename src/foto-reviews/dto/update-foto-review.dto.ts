import { PartialType } from '@nestjs/swagger';
import { CreateFotoReviewDto } from './create-foto-review.dto';

export class UpdateFotoReviewDto extends PartialType(CreateFotoReviewDto) {}
