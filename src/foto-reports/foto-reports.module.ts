import { Module } from '@nestjs/common';
import { PhotoReportsService } from './foto-reports.service';
import { PhotoReportsController } from './foto-reports.controller';
import { PhotoReport } from './entities/foto-report.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoReport])],
  controllers: [PhotoReportsController],
  providers: [PhotoReportsService],
})
export class FotoReportsModule {}
