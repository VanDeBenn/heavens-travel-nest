import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking } from './entities/booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '#/users/users.module';
import { DestinationsModule } from '#/destinations/destinations.module';
import { RoomHotelsModule } from '#/room-hotels/room-hotels.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]),UsersModule, DestinationsModule, RoomHotelsModule],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService, TypeOrmModule],
})
export class BookingsModule {}
