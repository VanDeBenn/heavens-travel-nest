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
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { WishlistService } from './wishlist.service';

@Controller('wishlists')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  async create(@Body() createWishlistDto: CreateWishlistDto) {
    return {
      data: await this.wishlistService.create(createWishlistDto),
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

  // @Post(':id/destination')
  // async addDestinationToWishlist(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() dto,
  // ) {
  //   return this.wishlistService.addDestinationToWishlist(dto);
  // }

  // @Post(':id/hotel')
  // async addHotelToWishlist(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() dto,
  // ) {
  //   return this.wishlistService.addHotelToWishlist(dto);
  // }

  // @Delete(':id/:destinationId')
  // async removeDestinationFromWishlist(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Param('destinationId', ParseUUIDPipe) destinationId: string,
  //   @Body() dto,
  // ) {
  //   return this.wishlistService.removeDestinationFromWishlist(dto);
  // }

  // @Delete(':id/:hotelId')
  // async removeHotelFromWishlist(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Param('hotelId', ParseUUIDPipe) hotelId: string,
  //   @Body() dto,
  // ) {
  //   return this.wishlistService.removeHotelFromWishlist(dto);
  // }

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

  @Delete()
  async deleteWishlist(
    @Body() dto: { destinationName: string; hotelName: string; userId: string },
  ) {
    try {
      await this.wishlistService.delete(dto);
      return {
        message: 'Wishlist item deleted successfully',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while deleting the wishlist',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

//
