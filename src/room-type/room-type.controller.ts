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
import { RoomTypeService } from './room-type.service';
import { UpdateRoomTypeDto } from './dto/update-room-type.dto';
import { CreateRoomTypeDto } from './dto/create-room-type.dto';

@Controller('roomtypes')
export class RoomTypeController {
  constructor(private readonly roomtypesService: RoomTypeService) {}

  @Post()
  async create(@Body() createRoomTypeDto: CreateRoomTypeDto) {
    return {
      data: await this.roomtypesService.create(createRoomTypeDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  async findAll() {
    const [data, count] = await this.roomtypesService.findAll();

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
      data: await this.roomtypesService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRoomTypeDto: UpdateRoomTypeDto,
  ) {
    return {
      data: await this.roomtypesService.update(id, updateRoomTypeDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.roomtypesService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}

//
