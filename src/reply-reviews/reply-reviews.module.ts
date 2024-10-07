import { Module } from '@nestjs/common';
import { ReplyReviewService } from './reply-reviews.service';
import { ReplyReviewController } from './reply-reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReplyReview } from './entities/reply-review.entity';
import { UsersModule } from '#/users/users.module';
import { ReviewsModule } from '#/reviews/reviews.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReplyReview]), UsersModule, ReviewsModule],
  controllers: [ReplyReviewController],
  providers: [ReplyReviewService],
  exports: [ReplyReviewService],
})
export class ReplyReviewsModule {}
