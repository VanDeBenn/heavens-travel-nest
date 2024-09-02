import { Module } from '@nestjs/common';
import { FotoDestinationsService } from './foto-destinations.service';
import { FotoDestinationsController } from './foto-destinations.controller';

@Module({
  controllers: [FotoDestinationsController],
  providers: [FotoDestinationsService]
})
export class FotoDestinationsModule {}
