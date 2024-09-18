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
import { PhotoDestinationsService } from './foto-destinations.service';
import { CreatePhotoDestinationDto } from './dto/create-foto-destination.dto';
import { UpdatePhotoDestinationDto } from './dto/update-foto-destination.dto';


@Controller('photodestinations')
export class PhotoDestinationsController {
  constructor(private readonly photodestinationsService: PhotoDestinationsService) {}

  @Post()
  async create(@Body() createPhotoDestinationDto: CreatePhotoDestinationDto) {
    return {
      data: await this.photodestinationsService.create(createPhotoDestinationDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  async findAll() {
    const [data, count] = await this.photodestinationsService.findAll();

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
      data: await this.photodestinationsService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePhotoDestinationDto: UpdatePhotoDestinationDto,
  ) {
    return {
      data: await this.photodestinationsService.update(id, updatePhotoDestinationDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.photodestinationsService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}

//
