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
import { Booking } from '#/bookings/entities/booking.entity';

@Injectable()
export class BookingDetailsService {
  constructor(
    @InjectRepository(BookingDetail)
    private bookingDetailRepository: Repository<BookingDetail>,
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    private bookingService: BookingsService,
    private cartService: CartService,
  ) {}

  // create new role
  async create(createBookingDetailDto: CreateBookingDetailDto) {
    const cart = await this.cartService.findOne(createBookingDetailDto.cartId);

    const booking = await this.bookingService.findOne(
      createBookingDetailDto.bookingId,
    );

    const dataBookingDetail = new BookingDetail();
    dataBookingDetail.booking = booking;
    dataBookingDetail.cart = cart;
    // dataBookingDetail.priceDetail = createBookingDetailDto.priceDetail || null;
    // dataBookingDetail.totalPrice = createBookingDetailDto.totalPrice || null;
    // dataBookingDetail.orderStatus = createBookingDetailDto.orderStatus || null;

    const result = await this.bookingDetailRepository.insert(dataBookingDetail);

    return this.bookingDetailRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.bookingDetailRepository.findAndCount({
      relations: {
        booking: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.bookingDetailRepository.findOneOrFail({
        where: {
          id,
        },
        relations: {
          cart: true,
          refund: true,
          review: true,
          report: true,
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

  async updateBookingDetails(updateBookingDetailsDto: UpdateBookingDetailDto) {
    const { selectedCartIds } = updateBookingDetailsDto;
    // console.log('DTO:', updateBookingDetailsDto);

    try {
      // find booking
      const booking = await this.bookingService.findOne(
        updateBookingDetailsDto.bookingId,
      );
      if (!booking) {
        throw new Error('Booking not found');
      }
      // console.log('Found booking:', booking);

      // find existing booking detail
      const existingBookingDetails = await this.bookingDetailRepository.find({
        where: { booking: { id: updateBookingDetailsDto.bookingId } },
        relations: { cart: true },
      });
      // console.log('Existing booking details:', existingBookingDetails);

      // delete booking details with unselected cart id
      const bookingDetailsToDelete = existingBookingDetails.filter(
        (detail) => !selectedCartIds.includes(detail.cart.id),
      );
      // console.log('Booking details to delete:', bookingDetailsToDelete);

      // loop to delete unselected booking details
      for (const detail of bookingDetailsToDelete) {
        await this.bookingDetailRepository.delete(detail.id);
        // console.log(`Deleted booking detail ID: ${detail.id}`);
      }

      const newBookingDetails = [];
      // loop through selected cart ids and create new booking details if not exist
      for (const cartId of selectedCartIds) {
        const cart = await this.cartService.findOne(cartId);
        if (!cart) {
          console.warn(`Cart with ID ${cartId} not found, skipping...`);
          continue;
        }
        // console.log('Found cart:', cart);

        const existingDetail = existingBookingDetails.find(
          (detail) => detail.cart.id === cartId,
        );
        if (!existingDetail) {
          const newBookingDetail = new BookingDetail();
          newBookingDetail.cart = cart;
          newBookingDetail.booking = booking;

          const savedDetail = await this.bookingDetailRepository.save(
            newBookingDetail,
          );
          // console.log('Saved new booking detail:', savedDetail);
          newBookingDetails.push(savedDetail);
        }
      }

      // console.log('New booking details added:', newBookingDetails);
      return newBookingDetails;
    } catch (error) {
      console.error('Error in updateBookingDetails:', error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error updating booking details',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  s;

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
      await this.bookingDetailRepository.findOneOrFail({
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

    const result = await this.bookingDetailRepository.update(
      id,
      dataBookingDetail,
    );

    return this.bookingDetailRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete role
  async remove(id: string) {
    try {
      await this.bookingDetailRepository.findOneOrFail({
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

    await this.bookingDetailRepository.delete(id);
  }
}
