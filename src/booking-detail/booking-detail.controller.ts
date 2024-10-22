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
import { BookingDetailsService } from './booking-detail.service';
import { CreateBookingDetailDto } from './dto/create-booking-detail.dto';
import { UpdateBookingDetailDto } from './dto/update-booking-detail.dto';

@Controller('booking-details')
export class BookingDetailsController {
  constructor(private readonly bookingdetailsService: BookingDetailsService) {}

  @Post()
  async create(@Body() createBookingDetailDto: CreateBookingDetailDto) {
    return {
      data: await this.bookingdetailsService.create(createBookingDetailDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  async findAll() {
    const [data, count] = await this.bookingdetailsService.findAll();

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
      data: await this.bookingdetailsService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBookingDetailDto: UpdateBookingDetailDto,
  ) {
    return {
      data: await this.bookingdetailsService.update(id, updateBookingDetailDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.bookingdetailsService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}

//
