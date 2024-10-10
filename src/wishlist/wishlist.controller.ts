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
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { WishlistService } from './wishlist.service';

@Controller('wishlists')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  async create(@Body() id: string) {
    return {
      data: await this.wishlistService.create(id),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  async findAll() {
    const [data, count] = await this.wishlistService.findAll();

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
    return this.wishlistService.addDestinationToWishlist(dto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return {
      data: await this.wishlistService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return {
      data: await this.wishlistService.update(id, updateWishlistDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.wishlistService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}

//
