import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesFaqsService } from './categories-faqs.service';
import { CreateCategoriesFaqDto } from './dto/create-categories-faq.dto';
import { UpdateCategoriesFaqDto } from './dto/update-categories-faq.dto';

@Controller('categories-faqs')
export class CategoriesFaqsController {
  constructor(private readonly categoriesFaqsService: CategoriesFaqsService) {}

  @Post()
  create(@Body() createCategoriesFaqDto: CreateCategoriesFaqDto) {
    return this.categoriesFaqsService.create(createCategoriesFaqDto);
  }

  @Get()
  findAll() {
    return this.categoriesFaqsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesFaqsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriesFaqDto: UpdateCategoriesFaqDto) {
    return this.categoriesFaqsService.update(+id, updateCategoriesFaqDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesFaqsService.remove(+id);
  }
}
