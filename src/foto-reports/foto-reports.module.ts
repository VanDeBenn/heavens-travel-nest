import { Module } from '@nestjs/common';
import { FotoReportsService } from './foto-reports.service';
import { FotoReportsController } from './foto-reports.controller';

@Module({
  controllers: [FotoReportsController],
  providers: [FotoReportsService]
})
export class FotoReportsModule {}
