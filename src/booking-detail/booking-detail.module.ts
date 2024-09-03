import { Module } from '@nestjs/common';
import { BookingDetailService } from './booking-detail.service';
import { BookingDetailController } from './booking-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingDetail } from './entities/booking-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookingDetail])],
  controllers: [BookingDetailController],
  providers: [BookingDetailService],
})
export class BookingDetailModule {}
