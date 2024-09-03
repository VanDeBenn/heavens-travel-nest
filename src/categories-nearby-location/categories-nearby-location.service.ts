import { Injectable } from '@nestjs/common';
import { CreateCategoriesNearbyLocationDto } from './dto/create-categories-nearby-location.dto';
import { UpdateCategoriesNearbyLocationDto } from './dto/update-categories-nearby-location.dto';

@Injectable()
export class CategoriesNearbyLocationService {
  create(createCategoriesNearbyLocationDto: CreateCategoriesNearbyLocationDto) {
    return 'This action adds a new categoriesNearbyLocation';
  }

  findAll() {
    return `This action returns all categoriesNearbyLocation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoriesNearbyLocation`;
  }

  update(id: number, updateCategoriesNearbyLocationDto: UpdateCategoriesNearbyLocationDto) {
    return `This action updates a #${id} categoriesNearbyLocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoriesNearbyLocation`;
  }
}
