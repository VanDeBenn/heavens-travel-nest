import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ServiceAmenitysService } from './service-amenities.service';
import { CreateServiceAmenityDto } from './dto/create-service-amenity.dto';
import { UpdateServiceAmenityDto } from './dto/update-service-amenity.dto';

@Controller('serviceamenitys')
export class ServiceAmenitysController {
  constructor(private readonly serviceamenitysService: ServiceAmenitysService) {}

  @Post()
  async create(@Body() createServiceAmenityDto: CreateServiceAmenityDto) {
    return {
      data: await this.serviceamenitysService.create(createServiceAmenityDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  async findAll() {
    const [data, count] = await this.serviceamenitysService.findAll();

    return {
      data,
      count,
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return {
      data: await this.serviceamenitysService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateServiceAmenityDto: UpdateServiceAmenityDto,
  ) {
    return {
      data: await this.serviceamenitysService.update(id, updateServiceAmenityDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.serviceamenitysService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}

//
