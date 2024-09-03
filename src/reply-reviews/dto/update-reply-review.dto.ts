import { PartialType } from '@nestjs/swagger';
import { CreateReplyReviewDto } from './create-reply-review.dto';

export class UpdateReplyReviewDto extends PartialType(CreateReplyReviewDto) {}
