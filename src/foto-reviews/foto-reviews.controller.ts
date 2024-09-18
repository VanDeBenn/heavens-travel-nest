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
import { PhotoReviewsService } from './foto-reviews.service';
import { UpdatePhotoReviewDto } from './dto/update-foto-review.dto';
import { CreatePhotoReviewDto } from './dto/create-foto-review.dto';


@Controller('photoreviews')
export class PhotoReviewsController {
  constructor(private readonly photoreviewsService: PhotoReviewsService) {}

  @Post()
  async create(@Body() createPhotoReviewDto: CreatePhotoReviewDto) {
    return {
      data: await this.photoreviewsService.create(createPhotoReviewDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  async findAll() {
    const [data, count] = await this.photoreviewsService.findAll();

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
      data: await this.photoreviewsService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePhotoReviewDto: UpdatePhotoReviewDto,
  ) {
    return {
      data: await this.photoreviewsService.update(id, updatePhotoReviewDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.photoreviewsService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}

//
