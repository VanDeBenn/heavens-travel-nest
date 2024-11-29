import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './entities/report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { UsersService } from '#/users/users.service';
import { BookingDetailsService } from '#/booking-detail/booking-detail.service';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportsRepository: Repository<Report>,
    private userService: UsersService,
    private bookingDetail: BookingDetailsService,
  ) {}

  // create new report
  async create(createReportDto: CreateReportDto) {
    const user = await this.userService.findOne(createReportDto.userId);
    const bookingDetail = await this.bookingDetail.findOne(
      createReportDto.bookingDetailId,
    );

    const dataReport = new Report();
    dataReport.title = createReportDto.title;
    dataReport.description = createReportDto.description;
    dataReport.replyReport = createReportDto.replyReport;
    dataReport.email = createReportDto.email;
    dataReport.user = user;
    dataReport.bookingdetail = bookingDetail;

    const result = await this.reportsRepository.insert(dataReport);

    return this.reportsRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.reportsRepository.findAndCount({
      relations: {
        bookingdetail: true,
        photoreports: true,
        user: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.reportsRepository.findOneOrFail({
        where: {
          id,
        },
        relations: {
          bookingdetail: {
            cart: { destination: { photodestinations: true }, roomHotel: true },
          },
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }
  }

  // update report
  async update(id: string, updateReportDto: UpdateReportDto) {
    const user = await this.userService.findOne(updateReportDto.userId);

    let dataReport = new Report();
    dataReport.title = updateReportDto.title;
    dataReport.description = updateReportDto.description;
    (dataReport.replyReport = updateReportDto.replyReport),
      (dataReport.email = updateReportDto.email);
    dataReport.user = user;
    try {
      await this.reportsRepository.findOneOrFail({
        where: {
          id,
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }

    const result = await this.reportsRepository.update(id, dataReport);

    return this.reportsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete report
  async remove(id: string) {
    try {
      await this.reportsRepository.findOneOrFail({
        where: {
          id,
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }

    await this.reportsRepository.delete(id);
  }
}
