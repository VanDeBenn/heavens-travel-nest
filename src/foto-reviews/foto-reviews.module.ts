import { Module } from '@nestjs/common';
import { FotoReviewsService } from './foto-reviews.service';
import { FotoReviewsController } from './foto-reviews.controller';

@Module({
  controllers: [FotoReviewsController],
  providers: [FotoReviewsService]
})
export class FotoReviewsModule {}
