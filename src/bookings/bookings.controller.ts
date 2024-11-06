import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { XenditService } from '#/xendit/xendit.service';
import { Payment } from '#/payment/entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Refund } from '#/refund/entities/refund.entity';
import { PaymentsService } from '#/payment/payment.service';
import { RefundService } from '#/refund/refund.service';
import { UpdateRefundDto } from '#/refund/dto/update-refund.dto';
import { CreateRefundDto } from '#/refund/dto/create-refund.dto';

@Controller('bookings')
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly paymentService: PaymentsService,
    private readonly refundService: RefundService,
    private readonly xenditService: XenditService,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Refund)
    private refundRepository: Repository<Refund>,
  ) {}

  @Post()
  async create(@Body() createBookingDto: CreateBookingDto) {
    return {
      data: await this.bookingsService.create(createBookingDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  async findAll() {
    const [data, count] = await this.bookingsService.findAll();

    return {
      data,
      count,
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return {
      data: await this.bookingsService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    return {
      data: await this.bookingsService.update(id, updateBookingDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.bookingsService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Post('checkout')
  async createCheckout(
    @Body()
    dto,
  ) {
    const invoice = await this.paymentService.createInvoice(dto);
    if (invoice) {
      const data = new Payment();
      data.invoiceId = invoice?.id;
      data.externalId = invoice?.external_id;
      data.payerEmail = invoice?.payer_email;
      data.status = 'PAID';
      data.amount = invoice?.amount;
      data.booking = dto?.bookingId;

      await this.paymentRepository.insert(data);
    }

    return {
      data: invoice,
      id: invoice?.id,
      redirect: invoice?.invoice_url,
    };
  }

  @Get(':invoiceId')
  async createCheckoutSession(@Param('invoiceId') invoiceId: string) {
    const invoice = await this.xenditService.getInvoiceById(invoiceId);

    return {
      data: invoice,
    };
  }

  @Post('refund')
  async createRefund(@Body() createRefundDto: CreateRefundDto, dto) {
    return {
      data: await this.refundService.create(createRefundDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Post('refund/approve')
  async approve(
    @Body()
    dto,
  ) {
    const refund = await this.refundService.updateStatusRefund(dto);
    return {
      data: refund,
    };
  }

  @Post('disbursement')
  async disbursement(
    @Body()
    dto,
  ) {
    const refund = await this.xenditService.createDisbursement(dto);
    if (refund) {
      const data = new Refund();
      data.nameofBank = refund?.bank_code;
      data.accountHolder = refund?.account_holder_name;
      data.bankAccountNumber = dto.accountNumber;
      data.refundReason = refund?.disbursement_description;
      await this.refundRepository.insert(data);
    }
    return {
      data: refund,
    };
  }
}

//
