import { Module } from '@nestjs/common';
import { BookingDetailsService } from './booking-detail.service';
import { BookingDetailsController } from './booking-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingDetail } from './entities/booking-detail.entity';
import { BookingsModule } from '#/bookings/bookings.module';
import { CartModule } from '#/cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingDetail]),
    BookingsModule,
    CartModule,
  ],
  controllers: [BookingDetailsController],
  providers: [BookingDetailsService],
  exports: [BookingDetailsService],
})
export class BookingDetailModule {}
