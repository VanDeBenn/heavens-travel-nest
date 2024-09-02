import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FotoDestinationsService } from './foto-destinations.service';
import { CreatefotoDestinationDto } from './dto/create-foto-destination.dto';
import { UpdateFotoDestinationDto } from './dto/update-foto-destination.dto';

@Controller('foto-destinations')
export class FotoDestinationsController {
  constructor(private readonly fotoDestinationsService: FotoDestinationsService) {}

  @Post()
  create(@Body() createFotoDestinationDto: CreatefotoDestinationDto) {
    return this.fotoDestinationsService.create(createFotoDestinationDto);
  }

  @Get()
  findAll() {
    return this.fotoDestinationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fotoDestinationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFotoDestinationDto: UpdateFotoDestinationDto) {
    return this.fotoDestinationsService.update(+id, updateFotoDestinationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fotoDestinationsService.remove(+id);
  }
}
