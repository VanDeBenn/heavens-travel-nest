import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FotoReportsService } from './foto-reports.service';
import { CreateFotoReportDto } from './dto/create-foto-report.dto';
import { UpdateFotoReportDto } from './dto/update-foto-report.dto';

@Controller('foto-reports')
export class FotoReportsController {
  constructor(private readonly fotoReportsService: FotoReportsService) {}

  @Post()
  create(@Body() createFotoReportDto: CreateFotoReportDto) {
    return this.fotoReportsService.create(createFotoReportDto);
  }

  @Get()
  findAll() {
    return this.fotoReportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fotoReportsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFotoReportDto: UpdateFotoReportDto) {
    return this.fotoReportsService.update(+id, updateFotoReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fotoReportsService.remove(+id);
  }
}
