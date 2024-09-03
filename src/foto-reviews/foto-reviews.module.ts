import { Module } from '@nestjs/common';
import { FotoReviewsService } from './foto-reviews.service';
import { FotoReviewsController } from './foto-reviews.controller';
import { PhotoReview } from './entities/foto-review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoReview])],
  controllers: [FotoReviewsController],
  providers: [FotoReviewsService],
})
export class FotoReviewsModule {}
