import { Module } from '@nestjs/common';
import { FotoDestinationsService } from './foto-destinations.service';
import { FotoDestinationsController } from './foto-destinations.controller';
import { PhotoDestination } from './entities/foto-destination.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoDestination])],
  controllers: [FotoDestinationsController],
  providers: [FotoDestinationsService],
})
export class FotoDestinationsModule {}
