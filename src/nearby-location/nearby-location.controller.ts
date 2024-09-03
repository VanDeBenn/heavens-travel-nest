import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NearbyLocationService } from './nearby-location.service';
import { CreateNearbyLocationDto } from './dto/create-nearby-location.dto';
import { UpdateNearbyLocationDto } from './dto/update-nearby-location.dto';

@Controller('nearby-location')
export class NearbyLocationController {
  constructor(private readonly nearbyLocationService: NearbyLocationService) {}

  @Post()
  create(@Body() createNearbyLocationDto: CreateNearbyLocationDto) {
    return this.nearbyLocationService.create(createNearbyLocationDto);
  }

  @Get()
  findAll() {
    return this.nearbyLocationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nearbyLocationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNearbyLocationDto: UpdateNearbyLocationDto) {
    return this.nearbyLocationService.update(+id, updateNearbyLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nearbyLocationService.remove(+id);
  }
}
