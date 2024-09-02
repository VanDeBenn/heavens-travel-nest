import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SomehelpfulFactsService } from './somehelpful-facts.service';
import { CreateSomehelpfulFactDto } from './dto/create-somehelpful-fact.dto';
import { UpdateSomehelpfulFactDto } from './dto/update-somehelpful-fact.dto';

@Controller('somehelpful-facts')
export class SomehelpfulFactsController {
  constructor(private readonly somehelpfulFactsService: SomehelpfulFactsService) {}

  @Post()
  create(@Body() createSomehelpfulFactDto: CreateSomehelpfulFactDto) {
    return this.somehelpfulFactsService.create(createSomehelpfulFactDto);
  }

  @Get()
  findAll() {
    return this.somehelpfulFactsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.somehelpfulFactsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSomehelpfulFactDto: UpdateSomehelpfulFactDto) {
    return this.somehelpfulFactsService.update(+id, updateSomehelpfulFactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.somehelpfulFactsService.remove(+id);
  }
}
