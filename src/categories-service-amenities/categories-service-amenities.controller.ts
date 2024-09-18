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
import { CategoriServiceAmenitysService } from './categories-service-amenities.service';
import { CreateCategoriServiceAmenityDto } from './dto/create-categories-service-amenity.dto';


@Controller('categoriserviceamenitys')
export class CategoriServiceAmenitysController {
  constructor(private readonly categoriserviceamenitysService: CategoriServiceAmenitysService) {}

  @Post()
  async create(@Body() createCategoriServiceAmenityDto: CreateCategoriServiceAmenityDto) {
    return {
      data: await this.categoriserviceamenitysService.create(createCategoriServiceAmenityDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  async findAll() {
    const [data, count] = await this.categoriserviceamenitysService.findAll();

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
      data: await this.categoriserviceamenitysService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoriServiceAmenityDto: CreateCategoriServiceAmenityDto,
  ) {
    return {
      data: await this.categoriserviceamenitysService.update(id, updateCategoriServiceAmenityDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.categoriserviceamenitysService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}

//
