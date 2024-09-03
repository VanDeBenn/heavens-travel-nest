import { Injectable } from '@nestjs/common';
import { CreatefotoReportDto } from './dto/create-foto-report.dto';
import { UpdateFotoReportDto } from './dto/update-foto-report.dto';

@Injectable()
export class FotoReportsService {
  create(createFotoReportDto: CreatefotoReportDto) {
    return 'This action adds a new fotoReport';
  }

  findAll() {
    return `This action returns all fotoReports`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fotoReport`;
  }

  update(id: number, updateFotoReportDto: UpdateFotoReportDto) {
    return `This action updates a #${id} fotoReport`;
  }

  remove(id: number) {
    return `This action removes a #${id} fotoReport`;
  }
}
