import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { BookingDetail } from './entities/booking-detail.entity';
import { CreateBookingDetailDto } from './dto/create-booking-detail.dto';
import { UpdateBookingDetailDto } from './dto/update-booking-detail.dto';

@Injectable()
export class BookingDetailsService {
  constructor(
    @InjectRepository(BookingDetail)
    private rolesRepository: Repository<BookingDetail>,
  ) {}

  // create new role
  async create(createBookingDetailDto: CreateBookingDetailDto) {
    const dataBookingDetail = new BookingDetail();

    const result = await this.rolesRepository.insert(dataBookingDetail);

    return this.rolesRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.rolesRepository.findAndCount({
      relations: {
        refund: true,
        review: true,
        report: true,
        destination: true,
        roomhotel: true,
        booking: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.rolesRepository.findOneOrFail({
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
  }

  // update role
  async update(id: string, updateBookingDetailDto: UpdateBookingDetailDto) {
    let dataBookingDetail = new BookingDetail();

    try {
      await this.rolesRepository.findOneOrFail({
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

    const result = await this.rolesRepository.update(id, dataBookingDetail);

    return this.rolesRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete role
  async remove(id: string) {
    try {
      await this.rolesRepository.findOneOrFail({
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

    await this.rolesRepository.delete(id);
  }
}

