import { PartialType } from '@nestjs/swagger';
import { CreateFotoReportDto } from './create-foto-report.dto';

export class UpdateFotoReportDto extends PartialType(CreateFotoReportDto) {}
