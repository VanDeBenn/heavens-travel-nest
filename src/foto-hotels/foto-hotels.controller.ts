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
import { PhotoHotelsService } from './foto-hotels.service';
import { CreatePhotoHotelDto } from './dto/create-foto-hotel.dto';
import { UpdatePhotoHotelDto } from './dto/update-foto-hotel.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageProfile } from '#/utils/upload-file';
import { of } from 'rxjs';
import { join } from 'path';

@Controller('photohotels')
export class PhotoHotelsController {
  constructor(private readonly photohotelsService: PhotoHotelsService) {}

  @Post()
  async create(@Body() createPhotoHotelDto: CreatePhotoHotelDto) {
    return {
      data: await this.photohotelsService.create(createPhotoHotelDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storageProfile('photo-hotels')))
  async createProduct(@UploadedFile() file: Express.Multer.File) {
    return {
      data: file,
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get(':image')
  getImage(@Param('image') imagePath: string, @Res() res: any) {
    return of(
      res.sendFile(
        join(process.cwd(), `public/images/photo-hotels/${imagePath}`),
      ),
    );
  }

  @Get()
  async findAll() {
    const [data, count] = await this.photohotelsService.findAll();

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
      data: await this.photohotelsService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePhotoHotelDto: UpdatePhotoHotelDto,
  ) {
    return {
      data: await this.photohotelsService.update(id, updatePhotoHotelDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.photohotelsService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}

//
