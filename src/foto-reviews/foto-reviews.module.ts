import { Module } from '@nestjs/common';
import { PhotoReviewsService } from './foto-reviews.service';
import { PhotoReviewsController } from './foto-reviews.controller';
import { PhotoReview } from './entities/foto-review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsModule } from '#/reviews/reviews.module';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoReview]),ReviewsModule],
  controllers: [PhotoReviewsController],
  providers: [PhotoReviewsService],
  exports: [PhotoReviewsService],
})
export class FotoReviewsModule {}
