import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { BookingDetail } from './entities/booking-detail.entity';
import { CreateBookingDetailDto } from './dto/create-booking-detail.dto';
import { UpdateBookingDetailDto } from './dto/update-booking-detail.dto';
import { Destination } from '#/destinations/entities/destination.entity';

@Injectable()
export class BookingDetailsService {
  cartService: any;
  roomHotelService: any;
  bookingService: any;
  destinationService: any;
  constructor(
    @InjectRepository(BookingDetail)
    private rolesRepository: Repository<BookingDetail>,
  ) {}

  // create new role
  async create(createBookingDetailDto: CreateBookingDetailDto) {
    const cart = await this.cartService.findOne(createBookingDetailDto.cartId);
    const destination = await this.destinationService.findOne(createBookingDetailDto.destinationId);
    const roomHotel = await this.roomHotelService.findOne(createBookingDetailDto.roomHotelId);
    const booking = await this.bookingService.findOne(createBookingDetailDto.bookingId);

    const dataBookingDetail = new BookingDetail();
    dataBookingDetail.startDate = createBookingDetailDto. startDate;
    dataBookingDetail.endDate = createBookingDetailDto. endDate;
    dataBookingDetail.quantity = createBookingDetailDto.quantity;
    dataBookingDetail.priceDetail = createBookingDetailDto.priceDetail;
    dataBookingDetail.orderStatus = createBookingDetailDto.orderStatus;
    dataBookingDetail.cart = cart;
    dataBookingDetail.roomhotel = roomHotel;
    dataBookingDetail.booking = booking;
    dataBookingDetail.destination = destination
    
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
    const cart = await this.cartService.findOne(updateBookingDetailDto.cartId);
    const destination = await this.destinationService.findOne(updateBookingDetailDto.destinationId);
    const roomHotel = await this.roomHotelService.findOne(updateBookingDetailDto.roomHotelId);
    const booking = await this.bookingService.findOne(updateBookingDetailDto.bookingId);

    let dataBookingDetail = new BookingDetail();
    dataBookingDetail.startDate = updateBookingDetailDto. startDate;
    dataBookingDetail.endDate = updateBookingDetailDto. endDate;
    dataBookingDetail.quantity = updateBookingDetailDto.quantity;
    dataBookingDetail.priceDetail = updateBookingDetailDto.priceDetail;
    dataBookingDetail.orderStatus = updateBookingDetailDto.orderStatus;
    dataBookingDetail.cart = cart;
    dataBookingDetail.roomhotel = roomHotel;
    dataBookingDetail.booking = booking;
    dataBookingDetail.destination = destination


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

