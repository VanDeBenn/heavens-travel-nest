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
import { NearbyLocationService } from './nearby-location.service';
import { CreateNearbyLocationDto } from './dto/create-nearby-location.dto';
import { UpdateNearbyLocationDto } from './dto/update-nearby-location.dto';

@Controller('nearby-locations')
export class NearbyLocationController {
  constructor(private readonly nearbylocationService: NearbyLocationService) {}

  @Post()
  async create(@Body() createNearbyLocationDto: CreateNearbyLocationDto) {
    return {
      data: await this.nearbylocationService.create(createNearbyLocationDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  async findAll() {
    const [data, count] = await this.nearbylocationService.findAll();

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
      data: await this.nearbylocationService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateNearbyLocationDto: UpdateNearbyLocationDto,
  ) {
    return {
      data: await this.nearbylocationService.update(
        id,
        updateNearbyLocationDto,
      ),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.nearbylocationService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}

//
