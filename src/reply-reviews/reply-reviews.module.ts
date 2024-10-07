import { Module } from '@nestjs/common';
import { ReplyReviewService } from './reply-reviews.service';
import { ReplyReviewController } from './reply-reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReplyReview } from './entities/reply-review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReplyReview])],
  controllers: [ReplyReviewController],
  providers: [ReplyReviewService],
  exports: [ReplyReviewService],
})
export class ReplyReviewsModule {}
