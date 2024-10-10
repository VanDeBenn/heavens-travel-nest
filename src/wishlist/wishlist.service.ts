import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { UsersService } from '#/users/users.service';
import { HotelsService } from '#/hotels/hotels.service';
import { DestinationsService } from '#/destinations/destinations.service';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistsRepository: Repository<Wishlist>,
    private userService: UsersService,
    private destinationService: DestinationsService,
    private hotelService: HotelsService,
  ) {}

  // create new wishlist
  async create(id: string) {
    const user = await this.userService.findOne(id);

    // const destination = createWishlistDto.destinationId
    //   ? await this.destinationService.findOne(createWishlistDto.destinationId)
    //   : null;

    // const hotel = createWishlistDto.hotelId
    //   ? await this.hotelService.findOne(createWishlistDto.hotelId)
    //   : null;

    const dataWishlist = new Wishlist();
    dataWishlist.user = user;
    // dataWishlist.destination = destination;
    // dataWishlist.hotel = hotel;

    const result = await this.wishlistsRepository.insert(dataWishlist);

    return this.wishlistsRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  async addDestinationToWishlist(dto: {
    userId: string;
    wishlistId: string;
    destinationId: string;
  }) {
    const user = await this.userService.findOne(dto.userId);
    if (!user) throw new Error('User not found');

    const wishlist = await this.wishlistsRepository.findOne({
      where: { id: dto.wishlistId, user: { id: dto.userId } },
      relations: { destination: true },
    });
    if (!wishlist) throw new Error('Cart not found');

    const destination = await this.destinationService.findOne(
      dto.destinationId,
    );
    if (!destination) throw new Error('Destination not found');

    if (wishlist.destination.some((d) => d.id === destination.id)) {
      throw new Error('Destination already in wishlist');
    }

    wishlist.destination.push(destination);

    return this.wishlistsRepository.save(wishlist);
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
}
