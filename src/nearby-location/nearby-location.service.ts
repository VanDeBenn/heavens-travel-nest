import { Injectable } from '@nestjs/common';
import { CreateNearbyLocationDto } from './dto/create-nearby-location.dto';
import { UpdateNearbyLocationDto } from './dto/update-nearby-location.dto';

@Injectable()
export class NearbyLocationService {
  create(createNearbyLocationDto: CreateNearbyLocationDto) {
    return 'This action adds a new nearbyLocation';
  }

  findAll() {
    return `This action returns all nearbyLocation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nearbyLocation`;
  }

  update(id: number, updateNearbyLocationDto: UpdateNearbyLocationDto) {
    return `This action updates a #${id} nearbyLocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} nearbyLocation`;
  }
}
