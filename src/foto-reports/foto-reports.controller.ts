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
import { PhotoReportsService } from './foto-reports.service';
import { UpdatePhotoReportDto } from './dto/update-foto-report.dto';
import { CreatePhotoReportDto } from './dto/create-foto-report.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageProfile } from '#/utils/upload-file';
import { of } from 'rxjs';
import { join } from 'path';

@Controller('photo-reports')
export class PhotoReportsController {
  constructor(private readonly photoReportsService: PhotoReportsService) {}

  @Post()
  async create(@Body() createPhotoReportDto: CreatePhotoReportDto) {
    return {
      data: await this.photoReportsService.create(createPhotoReportDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storageProfile('photo-reports')))
  async addPhotoReports(
    @Body() addPhotoReportsDto: CreatePhotoReportDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      addPhotoReportsDto.pathPhoto = file.filename;
    }
    return {
      data: await this.photoReportsService.create(addPhotoReportsDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get(':image')
  getImage(@Param('image') imagePath: string, @Res() res: any) {
    return of(
      res.sendFile(
        join(process.cwd(), `public/images/photo-reports/${imagePath}`),
      ),
    );
  }

  @Get()
  async findAll() {
    const [data, count] = await this.photoReportsService.findAll();

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
      data: await this.photoReportsService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePhotoReportDto: UpdatePhotoReportDto,
  ) {
    return {
      data: await this.photoReportsService.update(id, updatePhotoReportDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.photoReportsService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}

//
