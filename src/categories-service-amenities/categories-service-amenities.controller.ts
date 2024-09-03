import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesServiceAmenitiesService } from './categories-service-amenities.service';
import { CreateCategoriesServiceAmenityDto } from './dto/create-categories-service-amenity.dto';
import { UpdateCategoriesServiceAmenityDto } from './dto/update-categories-service-amenity.dto';

@Controller('categories-service-amenities')
export class CategoriesServiceAmenitiesController {
  constructor(private readonly categoriesServiceAmenitiesService: CategoriesServiceAmenitiesService) {}

  @Post()
  create(@Body() createCategoriesServiceAmenityDto: CreateCategoriesServiceAmenityDto) {
    return this.categoriesServiceAmenitiesService.create(createCategoriesServiceAmenityDto);
  }

  @Get()
  findAll() {
    return this.categoriesServiceAmenitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesServiceAmenitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriesServiceAmenityDto: UpdateCategoriesServiceAmenityDto) {
    return this.categoriesServiceAmenitiesService.update(+id, updateCategoriesServiceAmenityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesServiceAmenitiesService.remove(+id);
  }
}
