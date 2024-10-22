import { CartService } from '#/cart/cart.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { BookingDetail } from './entities/booking-detail.entity';
import { CreateBookingDetailDto } from './dto/create-booking-detail.dto';
import { UpdateBookingDetailDto } from './dto/update-booking-detail.dto';
import { Destination } from '#/destinations/entities/destination.entity';
import { DestinationsService } from '#/destinations/destinations.service';
import { RoomHotelsService } from '#/room-hotels/room-hotels.service';
import { BookingsService } from '#/bookings/bookings.service';

@Injectable()
export class BookingDetailsService {
  constructor(
    @InjectRepository(BookingDetail)
    private rolesRepository: Repository<BookingDetail>,
    private bookingService: BookingsService,
    private cartService: CartService,
  ) {}

  // create new role
  async create(createBookingDetailDto: CreateBookingDetailDto) {
    // const cart = await this.cartService.findOne(createBookingDetailDto.cartId);

    // const booking = await this.bookingService.findOne(
    //   createBookingDetailDto.bookingId,
    // );

    const dataBookingDetail = new BookingDetail();
    dataBookingDetail.priceDetail = createBookingDetailDto.priceDetail;
    dataBookingDetail.totalPrice = createBookingDetailDto.totalPrice;
    dataBookingDetail.orderStatus = createBookingDetailDto.orderStatus;
    // dataBookingDetail.booking = booking;
    // dataBookingDetail.cart = cart;

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
    const booking = await this.bookingService.findOne(
      updateBookingDetailDto.bookingId,
    );

    let dataBookingDetail = new BookingDetail();
    dataBookingDetail.priceDetail = updateBookingDetailDto.priceDetail;
    dataBookingDetail.totalPrice = updateBookingDetailDto.totalPrice;
    dataBookingDetail.orderStatus = updateBookingDetailDto.orderStatus;
    dataBookingDetail.booking = booking;

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
