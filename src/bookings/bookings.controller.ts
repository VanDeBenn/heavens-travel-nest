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

@Controller('bookings')
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly xenditService: XenditService,
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
    const invoice = await this.xenditService.createInvoice(dto);

    return {
      invoice: invoice,
      id: invoice?.id,
      redirect: invoice?.invoice_url,
    };
  }

  @Get('checkout/:invoiceId')
  async createCheckoutSession(@Param('invoiceId') invoiceId: string) {
    const invoice = await this.xenditService.getInvoiceById(invoiceId);

    return {
      data: invoice,
    };
  }
}

//
