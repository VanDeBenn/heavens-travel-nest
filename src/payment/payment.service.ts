import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './entities/payment.entity';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { UsersService } from '#/users/users.service';
import { BookingsService } from '#/bookings/bookings.service';
import { randomUUID } from 'crypto';
import axios from 'axios';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    private readonly userService: UsersService,
    private readonly bookingService: BookingsService,
  ) {}
  private readonly xenditUrl = 'https://api.xendit.co/v2/invoices';

  async createInvoice(dto: {
    items?: {
      name: string;
      quantity: number;
      price: number;
      category: string;
      url: string;
    }[];
    user_id: string;
    bookingId: string;
  }) {
    console.log('Received DTO:', dto);

    const user = await this.userService.findOne(dto.user_id);
    if (!user || !user.email) {
      throw new Error('User not found or email is missing');
    }
    const email = user.email;
    console.log('User found:', { user_id: dto.user_id, email });

    const booking = await this.bookingService.findOne(dto.bookingId);
    if (!booking || !booking.bookingdetails) {
      throw new Error('No booking details found for this booking ID');
    }
    const bookingDetails = booking.bookingdetails;
    console.log('Booking details found:', bookingDetails);

    const invoiceId = randomUUID();
    const external_id = `htrip-${invoiceId}`;
    console.log('Generated external_id:', external_id);

    const items = bookingDetails.map((detail: any) => {
      const cart = detail.cart || {};
      const destination = cart.destination || {};
      const roomHotel = cart.roomHotel || {};
      console.log('ini room hotel', roomHotel);

      return {
        name: destination.name || roomHotel.roomType || 'Unknown Item',
        quantity:
          (cart.quantityAdult || 0) + (cart.quantityChildren || 0) ||
          cart.quantityRoom,
        price:
          (destination.priceAdult || 0) * (cart.quantityAdult || 0) +
            (destination.priceChildren || 0) * (cart.quantityChildren || 0) ||
          roomHotel.price ||
          0,
        category: destination.name ? 'Destination' : 'Hotel',
        url: destination.name
          ? `${process.env.FRONTEND_URL}/destinations/detail/${destination.id}`
          : `${process.env.FRONTEND_URL}/hotels/detail/${roomHotel.hotel.id}` ||
            `${process.env.FRONTEND_URL}/default-detail`,
      };
    });
    console.log('Processed items:', items);

    const totalAmount = items.reduce((sum, item) => sum + (item.price || 0), 0);
    console.log('Total amount calculated:', totalAmount);

    if (totalAmount <= 0) {
      throw new Error('Total amount must be greater than zero');
    }

    try {
      const payload = {
        external_id: external_id,
        user_id: user.id,
        amount: totalAmount,
        description: 'No refund',
        payer_email: email,
        items,
        success_redirect_url: `${process.env.FRONTEND_URL}/booking`,
        failure_redirect_url: `${process.env.FRONTEND_URL}/booking`,
      };
      console.log('Sending payload to Xendit:', payload);

      const response = await axios.post(this.xenditUrl, payload, {
        headers: { 'Content-Type': 'application/json' },
        auth: {
          username: process.env.XENDIT_SECRET_KEY,
          password: '',
        },
      });

      console.log('Xendit response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Xendit Error:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'Unknown error from Xendit',
      );
    }
  }

  // create new payment
  async create(createPaymentDto: CreatePaymentDto) {
    const dataPayment = new Payment();
    // dataPayment.name = createPaymentDto.name;

    const result = await this.paymentsRepository.insert(dataPayment);

    return this.paymentsRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.paymentsRepository.findAndCount({
      relations: {
        booking: true,
        // users: true,
      },
    });
  }

  async findOne(invoiceId: string) {
    try {
      return await this.paymentsRepository.findOneOrFail({
        where: {
          invoiceId,
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

  // update payment
  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    let dataPayment = new Payment();
    // dataPayment.name = dataPayment.name;

    try {
      await this.paymentsRepository.findOneOrFail({
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

    const result = await this.paymentsRepository.update(id, dataPayment);

    return this.paymentsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete payment
  async remove(id: string) {
    try {
      await this.paymentsRepository.findOneOrFail({
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

    await this.paymentsRepository.delete(id);
  }
}
