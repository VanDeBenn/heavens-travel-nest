import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateRefundDto } from './dto/create-refund.dto';
import { UpdateRefundDto } from './dto/update-refund.dto';
import { Refund } from './entities/refund.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { BookingDetailsService } from '#/booking-detail/booking-detail.service';
import axios from 'axios';
import { Payment } from '#/payment/entities/payment.entity';
import { BookingsService } from '#/bookings/bookings.service';

@Injectable()
export class RefundService {
  constructor(
    @InjectRepository(Refund)
    private refundsRepository: Repository<Refund>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private bookingService: BookingsService,
  ) {}
  private readonly xenditDisbursementUrl =
    'https://api.xendit.co/disbursements';

  // create new refund
  async create(createRefundDto: CreateRefundDto) {
    const booking = await this.bookingService.findOne(
      createRefundDto.bookingId,
    );

    const dataRefund = new Refund();
    dataRefund.nameofBank = createRefundDto.nameofBank;
    dataRefund.bankAccountNumber = createRefundDto.bankAccountNumber;
    dataRefund.accountHolder = createRefundDto.accountHolder;
    dataRefund.refundReason = createRefundDto.refundReason;
    dataRefund.booking = booking;

    const result = await this.refundsRepository.insert(dataRefund);

    return this.refundsRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  async updateStatusRefund(dto: {
    refundId: string;
    status: string;
    bookingId: string;
  }) {
    const refund = await this.findOne(dto.refundId);
    if (!refund) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          error: 'Refund not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    refund.status = dto.status;

    const booking = await this.bookingService.findOne(dto.bookingId);
    if (!booking) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          error: 'Booking not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (dto.status === 'approve') {
      try {
        const response = await axios.post(
          this.xenditDisbursementUrl,
          {
            external_id: booking.id,
            amount: booking.payment.amount,
            bank_code: refund.nameofBank,
            account_holder_name: refund.accountHolder,
            account_number: refund.bankAccountNumber,
            description: refund.refundReason || 'Refund disbursement',
          },
          {
            headers: { 'Content-Type': 'application/json' },
            auth: {
              username: process.env.XENDIT_SECRET_KEY || '',
              password: '',
            },
          },
        );
        return response.data;
      } catch (error) {
        console.error(
          'Failed to disburse refund:',
          error.response?.data || error.message,
        );
        throw new HttpException(
          {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Failed to process refund',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    // Update data refund di repository
    await this.refundsRepository.update(dto.refundId, { status: dto.status });

    // Cari data refund yang telah diupdate dan kembalikan sebagai respons
    try {
      return await this.refundsRepository.findOneOrFail({
        where: {
          id: dto.refundId,
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

  findAll() {
    return this.refundsRepository.findAndCount({
      relations: {
        // bookingdetail: true,
        booking: { payment: true },
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.refundsRepository.findOneOrFail({
        where: {
          id,
        },
        relations: {
          // bookingdetail: true,
          booking: {
            bookingdetails: {
              cart: {
                destination: { photodestinations: true },
                roomHotel: true,
              },
            },
            payment: true,
            user: true,
          },
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

  // update refund
  async update(id: string, updateRefundDto: UpdateRefundDto) {
    let dataRefund = new Refund();
    dataRefund.nameofBank = updateRefundDto.nameofBank;
    dataRefund.bankAccountNumber = updateRefundDto.bankAccountNumber;
    dataRefund.accountHolder = updateRefundDto.accountHolder;
    dataRefund.refundReason = updateRefundDto.refundReason;

    try {
      await this.refundsRepository.findOneOrFail({
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

    const result = await this.refundsRepository.update(id, dataRefund);

    return this.refundsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete refund
  async remove(id: string) {
    try {
      await this.refundsRepository.findOneOrFail({
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

    await this.refundsRepository.delete(id);
  }
}
