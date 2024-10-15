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
import { CreateCountrysDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { CountrysService } from './countries.service';

@Controller('countries')
export class CountrysController {
  constructor(private readonly countrysService: CountrysService) {}

  @Post()
  async create(@Body() createCountryDto: CreateCountrysDto) {
    return {
      data: await this.countrysService.create(createCountryDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get('fetch')
  async fetchCountries() {
    return await this.countrysService.fetchAndStoreCountries();
  }

  @Get()
  async findAll() {
    const [data, count] = await this.countrysService.findAll();

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
      data: await this.countrysService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCountryDto: UpdateCountryDto,
  ) {
    return {
      data: await this.countrysService.update(id, updateCountryDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.countrysService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}

//
