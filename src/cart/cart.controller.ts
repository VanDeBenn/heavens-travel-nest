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
  async create(@Body() createCartDto: CreateCartDto) {
    return {
      data: await this.cartsService.create(createCartDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  // Add to Cart
  @Post('add')
  async addToCart(
    @Body('userId') userId: string,
    @Body('destinationId') destinationId: string,
    @Body('roomHotelId') roomHotelId: string,
  ) {
    const addedCartItem = await this.cartsService.addToCart(
      userId,
      destinationId,
      roomHotelId,
    );
    return {
      message: 'Product added to cart',
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
