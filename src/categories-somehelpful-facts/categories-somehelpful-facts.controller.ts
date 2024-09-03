import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesSomehelpfulFactsService } from './categories-somehelpful-facts.service';
import { CreateCategoriesSomehelpfulFactDto } from './dto/create-categories-somehelpful-fact.dto';
import { UpdateCategoriesSomehelpfulFactDto } from './dto/update-categories-somehelpful-fact.dto';

@Controller('categories-somehelpful-facts')
export class CategoriesSomehelpfulFactsController {
  constructor(private readonly categoriesSomehelpfulFactsService: CategoriesSomehelpfulFactsService) {}

  @Post()
  create(@Body() createCategoriesSomehelpfulFactDto: CreateCategoriesSomehelpfulFactDto) {
    return this.categoriesSomehelpfulFactsService.create(createCategoriesSomehelpfulFactDto);
  }

  @Get()
  findAll() {
    return this.categoriesSomehelpfulFactsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesSomehelpfulFactsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriesSomehelpfulFactDto: UpdateCategoriesSomehelpfulFactDto) {
    return this.categoriesSomehelpfulFactsService.update(+id, updateCategoriesSomehelpfulFactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesSomehelpfulFactsService.remove(+id);
  }
}
