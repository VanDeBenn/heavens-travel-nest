import { Module } from '@nestjs/common';
import { PhotoDestinationsService } from './foto-destinations.service';
import { PhotoDestinationsController } from './foto-destinations.controller';
import { PhotoDestination } from './entities/foto-destination.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoDestination])],
  controllers: [PhotoDestinationsController],
  providers: [PhotoDestinationsService],
})
export class FotoDestinationsModule {}
