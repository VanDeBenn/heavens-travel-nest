import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { Report } from './entities/report.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '#/users/users.module';
import { BookingDetailModule } from '#/booking-detail/booking-detail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report]),
    UsersModule,
    BookingDetailModule,
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
