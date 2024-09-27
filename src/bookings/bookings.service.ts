import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class BookingsService {
  roleService: any;
  userService: any;
  cartService: any;
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
  ) {}

  // create new booking
  async create(createBookingDto: CreateBookingDto) {
    const user = await this.userService.findOne(createBookingDto.userId);
    const cart = await this.cartService.findOne(createBookingDto.cartId);

    const dataBooking = new Booking();
    dataBooking.customerName = createBookingDto.customerName;
    dataBooking.customerEmail = createBookingDto.customerEmail;
    dataBooking.CustomerPhoneNumber = createBookingDto.CustomerPhoneNumber;
    dataBooking.guestName = createBookingDto.guestName;
    dataBooking.guestEmail = createBookingDto.guestEmail;
    dataBooking.guestPhoneNumber = createBookingDto.guestPhoneNumber;
    dataBooking.paymentType = createBookingDto.paymentType;
    dataBooking.paymentDueDate = createBookingDto.paymentDueDate;
    dataBooking.paymentAmount = createBookingDto.paymentAmount;
    dataBooking.tokenTransaction = createBookingDto.tokenTransaction;
    dataBooking.totalPrice = createBookingDto.totalPrice;
    dataBooking.statusPayment = createBookingDto.statusPayment;
    dataBooking.fullFilment = createBookingDto.fullFilment;
    dataBooking.user = user;
    dataBooking.carts = cart;

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
    const user = await this.userService.findOne(updateBookingDto.userId);
    const cart = await this.cartService.findOne(updateBookingDto.cartId);

    let dataBooking = new Booking();
    dataBooking.customerName = updateBookingDto.customerName;
    dataBooking.customerEmail = updateBookingDto.customerEmail;
    dataBooking.CustomerPhoneNumber = updateBookingDto.CustomerPhoneNumber;
    dataBooking.guestName = updateBookingDto.guestName;
    dataBooking.guestEmail = updateBookingDto.guestEmail;
    dataBooking.guestPhoneNumber = updateBookingDto.guestPhoneNumber;
    dataBooking.paymentType = updateBookingDto.paymentType;
    dataBooking.paymentDueDate = updateBookingDto.paymentDueDate;
    dataBooking.paymentAmount = updateBookingDto.paymentAmount;
    dataBooking.tokenTransaction = updateBookingDto.tokenTransaction;
    dataBooking.totalPrice = updateBookingDto.totalPrice;
    dataBooking.statusPayment = updateBookingDto.statusPayment;
    dataBooking.fullFilment = updateBookingDto.fullFilment;
    dataBooking.user = user;
    dataBooking.carts = cart;

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

