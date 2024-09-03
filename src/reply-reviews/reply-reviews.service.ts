import { Injectable } from '@nestjs/common';
import { CreateReplyReviewDto } from './dto/create-reply-review.dto';
import { UpdateReplyReviewDto } from './dto/update-reply-review.dto';

@Injectable()
export class ReplyReviewsService {
  create(createReplyReviewDto: CreateReplyReviewDto) {
    return 'This action adds a new replyReview';
  }

  findAll() {
    return `This action returns all replyReviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} replyReview`;
  }

  update(id: number, updateReplyReviewDto: UpdateReplyReviewDto) {
    return `This action updates a #${id} replyReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} replyReview`;
  }
}
