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
  HttpException,
} from '@nestjs/common';
import { BookingDetailsService } from './booking-detail.service';
import { CreateBookingDetailDto } from './dto/create-booking-detail.dto';
import { UpdateBookingDetailDto } from './dto/update-booking-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingDetail } from './entities/booking-detail.entity';
import { Repository } from 'typeorm';

@Controller('booking-details')
export class BookingDetailsController {
  constructor(
    private readonly bookingdetailsService: BookingDetailsService,
    @InjectRepository(BookingDetail)
    private bookingDetailRepository: Repository<BookingDetail>,
  ) {}

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

  // @Get(':bookingId')
  // async cek(@Param('bookingId', ParseUUIDPipe) id: string) {
  //   const existingBookingDetails = await this.bookingDetailRepository.find({
  //     where: { booking: { id: createBookingDetailDto.bookingId } },
  //     relations: { cart: true },
  //   });
  //   console.log('Existing booking details:', existingBookingDetails);
  //   return {
  //     data: existingBookingDetails,
  //     statusCode: HttpStatus.OK,
  //     message: 'success',
  //   };
  // }

  @Put(':bookingId')
  async updateBookingDetails(
    @Param('bookingId') bookingId: string,
    @Body() updateBookingDetailsDto: UpdateBookingDetailDto,
  ) {
    try {
      updateBookingDetailsDto.bookingId = bookingId;

      const result = await this.bookingdetailsService.updateBookingDetails(
        updateBookingDetailsDto,
      );
      console.log('dto', updateBookingDetailsDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Booking details updated successfully',
        data: result,
      };
    } catch (error) {
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
