import { Injectable } from '@nestjs/common';
import { CreatefotoDestinationDto } from './dto/create-foto-destination.dto';
import { UpdateFotoDestinationDto } from './dto/update-foto-destination.dto';

@Injectable()
export class FotoDestinationsService {
  create(createFotoDestinationDto: CreatefotoDestinationDto) {
    return 'This action adds a new fotoDestination';
  }

  findAll() {
    return `This action returns all fotoDestinations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fotoDestination`;
  }

  update(id: number, updateFotoDestinationDto: UpdateFotoDestinationDto) {
    return `This action updates a #${id} fotoDestination`;
  }

  remove(id: number) {
    return `This action removes a #${id} fotoDestination`;
  }
}
