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

@Controller('photo-room-hotels')
export class PhotoRoomHotelsController {
  constructor(
    private readonly photoRoomHotelsService: PhotoRoomHotelsService,
  ) {}

  @Post()
  async create(@Body() createPhotoRoomHotelDto: CreatePhotoRoomHotelDto) {
    return {
      data: await this.photoRoomHotelsService.create(createPhotoRoomHotelDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storageProfile('photo-room-hotels')))
  async addPhotoRoomHotels(
    @Body() addPhotoRoomHotelsDto: CreatePhotoRoomHotelDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      addPhotoRoomHotelsDto.pathPhoto = file.filename;
    }
    return {
      data: await this.photoRoomHotelsService.create(addPhotoRoomHotelsDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get(':image')
  getImage(@Param('image') imagePath: string, @Res() res: any) {
    return of(
      res.sendFile(
        join(process.cwd(), `public/images/photo-room-hotels/${imagePath}`),
      ),
    );
  }

  @Get()
  async findAll() {
    const [data, count] = await this.photoRoomHotelsService.findAll();

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
      data: await this.photoRoomHotelsService.findOne(id),
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
      data: await this.photoRoomHotelsService.update(
        id,
        updatePhotoRoomHotelDto,
      ),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.photoRoomHotelsService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}

//
