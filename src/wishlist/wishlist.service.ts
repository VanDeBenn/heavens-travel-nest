import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class WishlistService {
  userService: any;
  destinationService: any;
  hotelService: any;
  constructor(
    @InjectRepository(Wishlist)
    private wishlistsRepository: Repository<Wishlist>,
  ) {}

  // create new wishlist
  async create(createWishlistDto: CreateWishlistDto) {
    const user = await this.userService.findOne(createWishlistDto.userId);
    const destination = await this.destinationService.findOne(createWishlistDto.destinationId);
    const hotel = await this.hotelService.findOne(createWishlistDto.hotelId);

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
    const destination = await this.destinationService.findOne(updateWishlistDto.destinationId);
    const hotel = await this.hotelService.findOne(updateWishlistDto.hotelId);

    let dataWishlist = new Wishlist();
    dataWishlist.user = user;
    dataWishlist.destination = destination;
    dataWishlist.hotel = hotel;

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
}
