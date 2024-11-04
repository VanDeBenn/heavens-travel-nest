import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { UsersService } from '#/users/users.service';
import { CartService } from '#/cart/cart.service';
import { BookingDetailsService } from '#/booking-detail/booking-detail.service';
import { BookingDetail } from '#/booking-detail/entities/booking-detail.entity';
import { DestinationsService } from '#/destinations/destinations.service';
import { RoomHotelsService } from '#/room-hotels/room-hotels.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    private userService: UsersService,
    private destinationService: DestinationsService,
    private roomHotelService: RoomHotelsService,
  ) {}

  // create new booking
  async create(createBookingDto: CreateBookingDto) {
    const user = await this.userService.findOne(createBookingDto.userId);

    // const destination = createBookingDto.destinationId
    //   ? await this.destinationService.findOne(createBookingDto.destinationId)
    //   : null;

    // const roomHotel = createBookingDto.roomHotelId
    //   ? await this.roomHotelService.findOne(createBookingDto.roomHotelId)
    //   : null;

    // if (!destination && !roomHotel) {
    //   throw new Error(
    //     'Error: Harus ada salah satu dari destination atau roomHotel yang diisi.',
    //   );
    // }

    const dataBooking = new Booking();
    // dataBooking.customerName = createBookingDto.customerName;
    // dataBooking.customerEmail = createBookingDto.customerEmail;
    // dataBooking.CustomerPhoneNumber = createBookingDto.CustomerPhoneNumber;
    // dataBooking.guestName = createBookingDto.guestName;
    // dataBooking.guestEmail = createBookingDto.guestEmail;
    // dataBooking.guestPhoneNumber = createBookingDto.guestPhoneNumber;
    // dataBooking.paymentType = createBookingDto.paymentType;
    // dataBooking.paymentDueDate = createBookingDto.paymentDueDate;
    // dataBooking.paymentAmount = createBookingDto.paymentAmount;
    // dataBooking.tokenTransaction = createBookingDto.tokenTransaction;
    // dataBooking.totalPrice = createBookingDto.totalPrice;
    // dataBooking.statusPayment = createBookingDto.statusPayment;
    // dataBooking.fullFilment = createBookingDto.fullFilment;
    dataBooking.user = user;
    // dataBooking.roomhotel = roomHotel;
    // dataBooking.destination = destination;

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
        relations: {
          bookingdetails: { cart: { destination: true, roomHotel: true } },
          destination: true,
          roomhotel: true,
          user: true,
          payment: true,
          refund: true,
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

    let dataBooking = new Booking();
    dataBooking.customerName = updateBookingDto.customerName;
    dataBooking.customerEmail = updateBookingDto.customerEmail;
    dataBooking.customerPhoneNumber = updateBookingDto.customerPhoneNumber;
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
    // dataBooking.user = user;

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
