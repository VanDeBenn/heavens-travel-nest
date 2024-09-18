import { Module } from '@nestjs/common';
import { BookingDetailsService } from './booking-detail.service';
import { BookingDetailsController } from './booking-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingDetail } from './entities/booking-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookingDetail])],
  controllers: [BookingDetailsController],
  providers: [BookingDetailsService],
})
export class BookingDetailModule {}
