import { PartialType } from '@nestjs/swagger';
import { CreatefotoReportDto } from './create-foto-report.dto';

export class UpdateFotoReportDto extends PartialType(CreatefotoReportDto) {}
