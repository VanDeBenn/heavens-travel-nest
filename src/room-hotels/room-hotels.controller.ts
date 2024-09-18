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
import { RoomHotelsService } from './room-hotels.service';
import { CreateRoomHotelDto } from './dto/create-room-hotel.dto';
import { UpdateRoomHotelDto } from './dto/update-room-hotel.dto';

@Controller('roomhotels')
export class RoomHotelsController {
  constructor(private readonly roomhotelsService: RoomHotelsService) {}

  @Post()
  async create(@Body() createRoomHotelDto: CreateRoomHotelDto) {
    return {
      data: await this.roomhotelsService.create(createRoomHotelDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  async findAll() {
    const [data, count] = await this.roomhotelsService.findAll();

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
      data: await this.roomhotelsService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRoomHotelDto: UpdateRoomHotelDto,
  ) {
    return {
      data: await this.roomhotelsService.update(id, updateRoomHotelDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.roomhotelsService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}

//
