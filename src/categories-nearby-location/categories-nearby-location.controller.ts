import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesNearbyLocationService } from './categories-nearby-location.service';
import { CreateCategoriesNearbyLocationDto } from './dto/create-categories-nearby-location.dto';
import { UpdateCategoriesNearbyLocationDto } from './dto/update-categories-nearby-location.dto';

@Controller('categories-nearby-location')
export class CategoriesNearbyLocationController {
  constructor(private readonly categoriesNearbyLocationService: CategoriesNearbyLocationService) {}

  @Post()
  create(@Body() createCategoriesNearbyLocationDto: CreateCategoriesNearbyLocationDto) {
    return this.categoriesNearbyLocationService.create(createCategoriesNearbyLocationDto);
  }

  @Get()
  findAll() {
    return this.categoriesNearbyLocationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesNearbyLocationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriesNearbyLocationDto: UpdateCategoriesNearbyLocationDto) {
    return this.categoriesNearbyLocationService.update(+id, updateCategoriesNearbyLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesNearbyLocationService.remove(+id);
  }
}
