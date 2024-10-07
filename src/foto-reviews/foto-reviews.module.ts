import { Module } from '@nestjs/common';
import { PhotoReviewsService } from './foto-reviews.service';
import { PhotoReviewsController } from './foto-reviews.controller';
import { PhotoReview } from './entities/foto-review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoReview])],
  controllers: [PhotoReviewsController],
  providers: [PhotoReviewsService],
  exports: [PhotoReviewsService],
})
export class FotoReviewsModule {}
