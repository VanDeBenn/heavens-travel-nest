import { PartialType } from '@nestjs/swagger';
import { CreatePhotoReportDto } from './create-foto-report.dto';

export class UpdatePhotoReportDto extends PartialType(CreatePhotoReportDto) {}
