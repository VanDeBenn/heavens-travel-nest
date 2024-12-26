import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { UsersService } from '#/users/users.service';
import { HotelsService } from '#/hotels/hotels.service';
import { DestinationsService } from '#/destinations/destinations.service';
import { Hotel } from '#/hotels/entities/hotel.entity';
import { Destination } from '#/destinations/entities/destination.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistsRepository: Repository<Wishlist>,
    @InjectRepository(Hotel)
    private hotelsRepository: Repository<Hotel>,
    @InjectRepository(Destination)
    private destinationRepository: Repository<Destination>,
    private userService: UsersService,
    private destinationService: DestinationsService,
    private hotelService: HotelsService,
  ) {}

  // create new wishlist
  async create(createWishlistDto: CreateWishlistDto) {
    const user = await this.userService.findOne(createWishlistDto.userId);

    const destination = createWishlistDto.destinationId
      ? await this.destinationService.findOne(createWishlistDto.destinationId)
      : null;

    const hotel = createWishlistDto.hotelId
      ? await this.hotelService.findOne(createWishlistDto.hotelId)
      : null;

    const dataWishlist = new Wishlist();
    dataWishlist.user = user;
    dataWishlist.destination = destination;
    dataWishlist.hotel = hotel;

    const result = await this.wishlistsRepository.insert(dataWishlist);

    return this.wishlistsRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.wishlistsRepository.findAndCount({
      relations: {
        user: true,
        destination: true,
        hotel: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.wishlistsRepository.findOneOrFail({
        where: {
          id,
        },
        relations: { destination: true, hotel: true },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }
  }

  // update wishlist
  async update(id: string, updateWishlistDto: UpdateWishlistDto) {
    const user = await this.userService.findOne(updateWishlistDto.userId);

    // const destination = updateWishlistDto.destinationId
    //   ? await this.destinationService.findOne(updateWishlistDto.destinationId)
    //   : null;

    // const hotel = updateWishlistDto.hotelId
    //   ? await this.hotelService.findOne(updateWishlistDto.hotelId)
    //   : null;

    let dataWishlist = new Wishlist();
    dataWishlist.user = user;
    // dataWishlist.destination = destination;
    // dataWishlist.hotel = hotel;

    try {
      await this.wishlistsRepository.findOneOrFail({
        where: {
          id,
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }

    const result = await this.wishlistsRepository.update(id, dataWishlist);

    return this.wishlistsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete wishlist
  async remove(id: string) {
    try {
      await this.wishlistsRepository.findOneOrFail({
        where: {
          id,
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }

    await this.wishlistsRepository.delete(id);
  }

  // delete wishlist
  async delete(dto: {
    userId: string;
    destinationName?: string;
    hotelName?: string;
  }) {
    const user = await this.userService.findOne(dto.userId);
    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const filters: any = { user: { id: dto.userId } };

    if (dto.destinationName) {
      const destination = await this.destinationRepository.findOne({
        where: { name: dto.destinationName },
      });
      if (!destination) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Destination not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      filters.destination = { id: destination.id };
    }

    if (dto.hotelName) {
      const hotel = await this.hotelsRepository.findOne({
        where: { name: dto.hotelName },
      });
      if (!hotel) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Hotel not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      filters.hotel = { id: hotel.id };
    }

    try {
      const wishlist = await this.wishlistsRepository.findOneOrFail({
        where: filters,
      });

      await this.wishlistsRepository.delete(wishlist.id);

      return { message: 'Wishlist item deleted successfully' };
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Wishlist not found for the specified filters',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }
  }
}
