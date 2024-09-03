import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceAmenitiesService } from './service-amenities.service';
import { CreateServiceAmenityDto } from './dto/create-service-amenity.dto';
import { UpdateServiceAmenityDto } from './dto/update-service-amenity.dto';

@Controller('service-amenities')
export class ServiceAmenitiesController {
  constructor(private readonly serviceAmenitiesService: ServiceAmenitiesService) {}

  @Post()
  create(@Body() createServiceAmenityDto: CreateServiceAmenityDto) {
    return this.serviceAmenitiesService.create(createServiceAmenityDto);
  }

  @Get()
  findAll() {
    return this.serviceAmenitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceAmenitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceAmenityDto: UpdateServiceAmenityDto) {
    return this.serviceAmenitiesService.update(+id, updateServiceAmenityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceAmenitiesService.remove(+id);
  }
}
