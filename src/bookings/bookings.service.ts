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

  async create(createBookingDto: CreateBookingDto) {
    const user = await this.userService.findOne(createBookingDto.userId);

    const destination = createBookingDto.destinationId
      ? await this.destinationService.findOne(createBookingDto.destinationId)
      : null;

    const roomHotel = createBookingDto.roomHotelId
      ? await this.roomHotelService.findOne(createBookingDto.roomHotelId)
      : null;

    const dataBooking = new Booking();

    dataBooking.user = user;
    dataBooking.startDate = createBookingDto.startDate;
    dataBooking.endDate = createBookingDto.endDate;
    dataBooking.quantityRoom = createBookingDto.quantityRoom;
    dataBooking.quantityAdult = createBookingDto.quantityAdult;
    dataBooking.quantityChildren = createBookingDto.quantityChildren;
    dataBooking.roomhotel = roomHotel;
    dataBooking.destination = destination;

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
        payment: true,
        bookingdetails: true,
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
          bookingdetails: {
            cart: {
              destination: {
                city: { province: { country: true } },
                photodestinations: true,
              },
              roomHotel: {
                photoroomhotels: true,
                hotel: { city: { province: { country: true } } },
              },
            },
          },
          destination: {
            city: { province: { country: true } },
            photodestinations: true,
          },
          roomhotel: {
            hotel: { city: { province: { country: true } } },
            photoroomhotels: true,
          },
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

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    const user = await this.userService.findOne(updateBookingDto.userId);

    let dataBooking = new Booking();
    dataBooking.customerName = updateBookingDto.customerName;
    dataBooking.customerEmail = updateBookingDto.customerEmail;
    dataBooking.customerPhoneNumber = updateBookingDto.customerPhoneNumber;
    dataBooking.guestName = updateBookingDto.guestName;
    dataBooking.guestEmail = updateBookingDto.guestEmail;
    dataBooking.guestPhoneNumber = updateBookingDto.guestPhoneNumber;

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
