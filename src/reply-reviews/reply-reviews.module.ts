import { Module } from '@nestjs/common';
import { ReplyReviewsService } from './reply-reviews.service';
import { ReplyReviewsController } from './reply-reviews.controller';

@Module({
  controllers: [ReplyReviewsController],
  providers: [ReplyReviewsService]
})
export class ReplyReviewsModule {}
