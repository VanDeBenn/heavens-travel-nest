import { Module } from '@nestjs/common';
import { PhotoDestinationsService } from './foto-destinations.service';
import { PhotoDestinationsController } from './foto-destinations.controller';
import { PhotoDestination } from './entities/foto-destination.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinationsModule } from '#/destinations/destinations.module';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoDestination]),DestinationsModule],
  controllers: [PhotoDestinationsController],
  providers: [PhotoDestinationsService],
  exports: [PhotoDestinationsService],
})
export class FotoDestinationsModule {}
