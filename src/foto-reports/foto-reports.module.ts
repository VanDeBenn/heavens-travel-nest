import { Module } from '@nestjs/common';
import { PhotoReportsService } from './foto-reports.service';
import { PhotoReportsController } from './foto-reports.controller';
import { PhotoReport } from './entities/foto-report.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsModule } from '#/reports/reports.module';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoReport]),ReportsModule],
  controllers: [PhotoReportsController],
  providers: [PhotoReportsService],
  exports: [PhotoReportsService],
})
export class FotoReportsModule {}
