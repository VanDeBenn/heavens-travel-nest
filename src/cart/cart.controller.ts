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
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartService } from './cart.service';

@Controller('carts')
export class CartController {
  constructor(private readonly cartsService: CartService) {}

  @Post()
  async create(@Body() id: string) {
    return {
      data: await this.cartsService.create(id),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  async findAll() {
    const [data, count] = await this.cartsService.findAll();

    return {
      data,
      count,
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Post(':id/destination')
  async addDestinationToCart(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto,
  ) {
    return this.cartsService.addDestinationToCart(dto);
  }

  @Post(':id/room-hotel')
  async addRoomHotelToCart(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto,
  ) {
    return this.cartsService.addRoomHotelToCart(dto);
  }

  @Delete(':id/destination/:destinationId')
  async removeDestinationFromCart(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('destinationId', ParseUUIDPipe) destinationId: string,
    @Body() dto,
  ) {
    return this.cartsService.removeDestinationFromCart(dto);
  }

  @Delete(':id/room-hotel/:roomHotelId')
  async removeHotelFromWishlist(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('roomHotelId', ParseUUIDPipe) roomHotelId: string,
    @Body() dto,
  ) {
    return this.cartsService.removeRoomHotelFromCart(dto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return {
      data: await this.cartsService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return {
      data: await this.cartsService.update(id, updateCartDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.cartsService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}

//
