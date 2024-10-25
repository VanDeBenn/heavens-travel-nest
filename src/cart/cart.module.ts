import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '#/users/users.module';
import { DestinationsModule } from '#/destinations/destinations.module';
import { RoomHotelsModule } from '#/room-hotels/room-hotels.module';
import { BookingsModule } from '#/bookings/bookings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart]),
    UsersModule,
    DestinationsModule,
    RoomHotelsModule,
    BookingsModule,
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService, TypeOrmModule],
})
export class CartModule {}
