import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FotoRoomHotelsService } from './foto-room-hotels.service';
import { CreateFotoRoomHotelDto } from './dto/create-foto-room-hotel.dto';
import { UpdateFotoRoomHotelDto } from './dto/update-foto-room-hotel.dto';

@Controller('foto-room-hotels')
export class FotoRoomHotelsController {
  constructor(private readonly fotoRoomHotelsService: FotoRoomHotelsService) {}

  @Post()
  create(@Body() createFotoRoomHotelDto: CreateFotoRoomHotelDto) {
    return this.fotoRoomHotelsService.create(createFotoRoomHotelDto);
  }

  @Get()
  findAll() {
    return this.fotoRoomHotelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fotoRoomHotelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFotoRoomHotelDto: UpdateFotoRoomHotelDto) {
    return this.fotoRoomHotelsService.update(+id, updateFotoRoomHotelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fotoRoomHotelsService.remove(+id);
  }
}
