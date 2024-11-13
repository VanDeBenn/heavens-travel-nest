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
import { UpdatePhotoRoomHotelDto } from './dto/update-foto-room-hotel.dto';
import { PhotoRoomHotelsService } from './foto-room-hotels.service';
import { CreatePhotoRoomHotelDto } from './dto/create-foto-room-hotel.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageProfile } from '#/utils/upload-file';
import { of } from 'rxjs';
import { join } from 'path';

@Controller('photoroomhotels')
export class PhotoRoomHotelsController {
  constructor(
    private readonly photoroomhotelsService: PhotoRoomHotelsService,
  ) {}

  @Post()
  async create(@Body() createPhotoRoomHotelDto: CreatePhotoRoomHotelDto) {
    return {
      data: await this.photoroomhotelsService.create(createPhotoRoomHotelDto),
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
    const [data, count] = await this.photoroomhotelsService.findAll();

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
      data: await this.photoroomhotelsService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePhotoRoomHotelDto: UpdatePhotoRoomHotelDto,
  ) {
    return {
      data: await this.photoroomhotelsService.update(
        id,
        updatePhotoRoomHotelDto,
      ),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.photoroomhotelsService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}

//
