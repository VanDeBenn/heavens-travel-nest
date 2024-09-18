import { Module } from '@nestjs/common';
import { NearbyLocationService } from './nearby-location.service';
import { NearbyLocationController } from './nearby-location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NearbyLocation } from './entities/nearby-location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NearbyLocation])],
  controllers: [NearbyLocationController],
  providers: [NearbyLocationService]
})
export class NearbyLocationModule {}
