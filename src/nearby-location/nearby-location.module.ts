import { Module } from '@nestjs/common';
import { NearbyLocationService } from './nearby-location.service';
import { NearbyLocationController } from './nearby-location.controller';

@Module({
  controllers: [NearbyLocationController],
  providers: [NearbyLocationService]
})
export class NearbyLocationModule {}
