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
import { PhotoDestinationsService } from './foto-destinations.service';
import { CreatePhotoDestinationDto } from './dto/create-foto-destination.dto';
import { UpdatePhotoDestinationDto } from './dto/update-foto-destination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageProfile } from '#/utils/upload-file';
import { of } from 'rxjs';
import { join } from 'path';

@Controller('photo-destinations')
export class PhotoDestinationsController {
  constructor(
    private readonly photodestinationsService: PhotoDestinationsService,
  ) {}

  @Post()
  async create(@Body() createPhotoDestinationDto: CreatePhotoDestinationDto) {
    return {
      data: await this.photodestinationsService.create(
        createPhotoDestinationDto,
      ),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', storageProfile('photo-destinations')),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (typeof file?.filename == 'undefined') {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'error file cannot be upload',
      };
    } else {
      return { fileName: file?.filename };
    }
  }

  @Get('upload/:image')
  getImage(
    // @Param('type') type: string,
    @Param('image') imagePath: string,
    @Res() res: any,
  ) {
    return of(
      res.sendFile(
        join(process.cwd(), `public/images/photo-destinations/${imagePath}`),
      ),
    );
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
      data: await this.photodestinationsService.update(
        id,
        updatePhotoDestinationDto,
      ),
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
