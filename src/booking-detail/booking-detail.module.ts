import { Module } from '@nestjs/common';
import { BookingDetailsService } from './booking-detail.service';
import { BookingDetailsController } from './booking-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingDetail } from './entities/booking-detail.entity';
import { BookingsModule } from '#/bookings/bookings.module';

@Module({
  imports: [TypeOrmModule.forFeature([BookingDetail]), BookingsModule],
  controllers: [BookingDetailsController],
  providers: [BookingDetailsService],
})
export class BookingDetailModule {}
