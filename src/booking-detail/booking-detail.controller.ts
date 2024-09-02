import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookingDetailService } from './booking-detail.service';
import { CreateBookingDetailDto } from './dto/create-booking-detail.dto';
import { UpdateBookingDetailDto } from './dto/update-booking-detail.dto';

@Controller('booking-detail')
export class BookingDetailController {
  constructor(private readonly bookingDetailService: BookingDetailService) {}

  @Post()
  create(@Body() createBookingDetailDto: CreateBookingDetailDto) {
    return this.bookingDetailService.create(createBookingDetailDto);
  }

  @Get()
  findAll() {
    return this.bookingDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDetailDto: UpdateBookingDetailDto) {
    return this.bookingDetailService.update(+id, updateBookingDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingDetailService.remove(+id);
  }
}
