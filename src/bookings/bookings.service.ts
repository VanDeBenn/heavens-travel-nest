import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
  ) {}

  // create new booking
  async create(createBookingDto: CreateBookingDto) {
    const dataBooking = new Booking();

    const result = await this.bookingsRepository.insert(dataBooking);

    return this.bookingsRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.bookingsRepository.findAndCount({
      relations: {
        carts: true,
        bookingdetails: true,
        user: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.bookingsRepository.findOneOrFail({
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

  // update booking
  async update(id: string, updateBookingDto: UpdateBookingDto) {
    let dataBooking = new Booking();

    try {
      await this.bookingsRepository.findOneOrFail({
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

    const result = await this.bookingsRepository.update(id, dataBooking);

    return this.bookingsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete booking
  async remove(id: string) {
    try {
      await this.bookingsRepository.findOneOrFail({
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

    await this.bookingsRepository.delete(id);
  }
}

