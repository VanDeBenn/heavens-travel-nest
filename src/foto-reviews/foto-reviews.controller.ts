import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FotoReviewsService } from './foto-reviews.service';
import { CreateFotoReviewDto } from './dto/create-foto-review.dto';
import { UpdateFotoReviewDto } from './dto/update-foto-review.dto';

@Controller('foto-reviews')
export class FotoReviewsController {
  constructor(private readonly fotoReviewsService: FotoReviewsService) {}

  @Post()
  create(@Body() createFotoReviewDto: CreateFotoReviewDto) {
    return this.fotoReviewsService.create(createFotoReviewDto);
  }

  @Get()
  findAll() {
    return this.fotoReviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fotoReviewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFotoReviewDto: UpdateFotoReviewDto) {
    return this.fotoReviewsService.update(+id, updateFotoReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fotoReviewsService.remove(+id);
  }
}
