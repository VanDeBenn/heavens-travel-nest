import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { UsersModule } from '#/users/users.module';
import { DestinationsModule } from '#/destinations/destinations.module';
import { HotelsModule } from '#/hotels/hotels.module';
import { Destination } from '#/destinations/entities/destination.entity';
import { Hotel } from '#/hotels/entities/hotel.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wishlist, Destination, Hotel]),
    UsersModule,
    DestinationsModule,
    HotelsModule,
  ],
  controllers: [WishlistController],
  providers: [WishlistService],
  exports: [WishlistService, TypeOrmModule],
})
export class WishlistModule {}
