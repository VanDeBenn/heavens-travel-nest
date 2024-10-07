import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review } from './entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '#/users/users.module';
import { BookingDetailModule } from '#/booking-detail/booking-detail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), UsersModule, BookingDetailModule],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
