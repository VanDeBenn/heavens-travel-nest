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
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { PhotoReviewsService } from './foto-reviews.service';
import { UpdatePhotoReviewDto } from './dto/update-foto-review.dto';
import { CreatePhotoReviewDto } from './dto/create-foto-review.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageProfile } from '#/utils/upload-file';
import { of } from 'rxjs';
import { join } from 'path';

@Controller('photo-reviews')
export class PhotoReviewsController {
  constructor(private readonly photoReviewsService: PhotoReviewsService) {}

  @Post()
  async create(@Body() createPhotoReviewDto: CreatePhotoReviewDto) {
    return {
      data: await this.photoReviewsService.create(createPhotoReviewDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storageProfile('photo-reviews')))
  async addPhotoReviews(
    @Body() addPhotoReviewsDto: CreatePhotoReviewDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      addPhotoReviewsDto.pathPhoto = file.filename;
    }
    return {
      data: await this.photoReviewsService.create(addPhotoReviewsDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get(':image')
  getImage(@Param('image') imagePath: string, @Res() res: any) {
    return of(
      res.sendFile(
        join(process.cwd(), `public/images/photo-reviews/${imagePath}`),
      ),
    );
  }

  @Get()
  async findAll() {
    const [data, count] = await this.photoReviewsService.findAll();

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
      data: await this.photoReviewsService.findOne(id),
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
      data: await this.photoReviewsService.update(id, updatePhotoReviewDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.photoReviewsService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}

//
