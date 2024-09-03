import { Injectable } from '@nestjs/common';
import { CreateServiceAmenityDto } from './dto/create-service-amenity.dto';
import { UpdateServiceAmenityDto } from './dto/update-service-amenity.dto';

@Injectable()
export class ServiceAmenitiesService {
  create(createServiceAmenityDto: CreateServiceAmenityDto) {
    return 'This action adds a new serviceAmenity';
  }

  findAll() {
    return `This action returns all serviceAmenities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceAmenity`;
  }

  update(id: number, updateServiceAmenityDto: UpdateServiceAmenityDto) {
    return `This action updates a #${id} serviceAmenity`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceAmenity`;
  }
}
