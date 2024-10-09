import { Module } from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { DestinationsController } from './destinations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destination } from './entities/destination.entity';
import { DistrictsModule } from '#/districts/districts.module';
import { CartModule } from '#/cart/cart.module';
import { UsersModule } from '#/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Destination]),
    DistrictsModule,
    // CartModule,
    UsersModule,
  ],
  controllers: [DestinationsController],
  providers: [DestinationsService],
  exports: [DestinationsService],
})
export class DestinationsModule {}
