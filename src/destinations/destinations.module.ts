import { Module } from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { DestinationsController } from './destinations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destination } from './entities/destination.entity';
import { CartModule } from '#/cart/cart.module';
import { UsersModule } from '#/users/users.module';
import { CitysModule } from '#/cities/cities.module';
import { City } from '#/cities/entities/city.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Destination, City]),
    CitysModule,
    // CartModule,
    UsersModule,
  ],
  controllers: [DestinationsController],
  providers: [DestinationsService],
  exports: [DestinationsService],
})
export class DestinationsModule {}
