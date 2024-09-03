import { Module } from '@nestjs/common';
import { FotoReportsService } from './foto-reports.service';
import { FotoReportsController } from './foto-reports.controller';
import { PhotoReport } from './entities/foto-report.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoReport])],
  controllers: [FotoReportsController],
  providers: [FotoReportsService],
})
export class FotoReportsModule {}
