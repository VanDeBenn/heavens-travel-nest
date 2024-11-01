import { Module, forwardRef } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking } from './entities/booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '#/users/users.module';
import { DestinationsModule } from '#/destinations/destinations.module';
import { RoomHotelsModule } from '#/room-hotels/room-hotels.module';
import { XenditModule } from '#/xendit/xendit.module';
import { Payment } from '#/payment/entities/payment.entity';
import { Refund } from '#/refund/entities/refund.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, Payment, Refund]),
    UsersModule,
    DestinationsModule,
    RoomHotelsModule,
    forwardRef(() => XenditModule),
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService, TypeOrmModule],
})
export class BookingsModule {}
