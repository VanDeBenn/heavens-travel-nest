import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FotoHotelsService } from './foto-hotels.service';
import { CreatephotoHotelsDto } from './dto/create-foto-hotel.dto';
import { UpdateFotoHotelDto } from './dto/update-foto-hotel.dto';

@Controller('foto-hotels')
export class FotoHotelsController {
  constructor(private readonly fotoHotelsService: FotoHotelsService) {}

  @Post()
  create(@Body() createFotoHotelDto: CreatephotoHotelsDto) {
    return this.fotoHotelsService.create(createFotoHotelDto);
  }

  @Get()
  findAll() {
    return this.fotoHotelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fotoHotelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFotoHotelDto: UpdateFotoHotelDto) {
    return this.fotoHotelsService.update(+id, updateFotoHotelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fotoHotelsService.remove(+id);
  }
}
