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
import { CreateCategoriesNearbyLocationDto } from './dto/create-categories-nearby-location.dto';
import { UpdateCategoriesNearbyLocationDto } from './dto/update-categories-nearby-location.dto';
import { CategoriesNearbyLocationsService } from './categories-nearby-location.service';

@Controller('categories-nearby-location')
export class CategoriesNearbyLocationsController {
  constructor(
    private readonly categoriesnearbylocationsService: CategoriesNearbyLocationsService,
  ) {}

  @Post()
  async create(
    @Body()
    createCategoriesNearbyLocationDto: CreateCategoriesNearbyLocationDto,
  ) {
    return {
      data: await this.categoriesnearbylocationsService.create(
        createCategoriesNearbyLocationDto,
      ),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  async findAll() {
    const [data, count] = await this.categoriesnearbylocationsService.findAll();

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
      data: await this.categoriesnearbylocationsService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    updateCategoriesNearbyLocationDto: UpdateCategoriesNearbyLocationDto,
  ) {
    return {
      data: await this.categoriesnearbylocationsService.update(
        id,
        updateCategoriesNearbyLocationDto,
      ),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.categoriesnearbylocationsService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}

//
