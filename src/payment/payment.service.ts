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
    const user = await this.userService.findOne(dto.user_id);
    const email = user?.email;
    const booking = await this.bookingService.findOne(dto.bookingId);
    const bookingDetails = booking?.bookingdetails;
    const invoiceId = randomUUID();
    const external_id = `heavens-travel-${invoiceId}`;

    if (!bookingDetails) {
      throw new Error('No booking details found for this booking ID');
    }

    const items = bookingDetails.map((detail: any) => {
      const cart = detail.cart;
      const destination = cart.destination;

      return {
        name: destination?.name,
        quantity: cart.quantityAdult + cart.quantityChildren,
        price:
          destination?.priceAdult * cart.quantityAdult +
          destination?.priceChildren * cart.quantityChildren,
        category: 'Destination',
        url: `${process.env.FRONTEND_URL}/destinations/detail/${destination?.id}`,
      };
    });

    const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

    try {
      const response = await axios.post(
        this.xenditUrl,
        {
          external_id: external_id,
          user_id: user,
          amount: totalAmount,
          description: 'no refund',
          payer_email: email,
          items,
          success_redirect_url: 'http://localhost:3000/booking',
          failure_redirect_url: 'http://localhost:3000/booking',
        },
        {
          headers: { 'Content-Type': 'application/json' },
          auth: {
            username: process.env.XENDIT_SECRET_KEY,
            password: '',
          },
        },
      );

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

  async findOne(id: string) {
    try {
      return await this.paymentsRepository.findOneOrFail({
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
