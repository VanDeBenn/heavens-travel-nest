import { Injectable } from '@nestjs/common';
import { CreateCategoriesServiceAmenityDto } from './dto/create-categories-service-amenity.dto';
import { UpdateCategoriesServiceAmenityDto } from './dto/update-categories-service-amenity.dto';

@Injectable()
export class CategoriesServiceAmenitiesService {
  create(createCategoriesServiceAmenityDto: CreateCategoriesServiceAmenityDto) {
    return 'This action adds a new categoriesServiceAmenity';
  }

  findAll() {
    return `This action returns all categoriesServiceAmenities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoriesServiceAmenity`;
  }

  update(id: number, updateCategoriesServiceAmenityDto: UpdateCategoriesServiceAmenityDto) {
    return `This action updates a #${id} categoriesServiceAmenity`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoriesServiceAmenity`;
  }
}
