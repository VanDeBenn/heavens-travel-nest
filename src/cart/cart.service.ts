import { RoomHotelsService } from './../room-hotels/room-hotels.service';
import { DestinationsService } from './../destinations/destinations.service';
import { UsersService } from '#/users/users.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartsRepository: Repository<Cart>,
    private usersService: UsersService,
    private destinationsService: DestinationsService,
    private roomHotelsService: RoomHotelsService,
  ) {}

  // Add to Cart function
  async addToCart(userId: string, destinationId: string, roomHotelId: string) {
    const user = await this.usersService.findOne(userId);
    const destination = destinationId
      ? await this.destinationsService.findOne(destinationId)
      : null;

    const roomHotel = roomHotelId
      ? await this.roomHotelsService.findOne(roomHotelId)
      : null;

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const cartItem = new Cart();
    cartItem.user = user;
    cartItem.destination = destination;
    cartItem.roomhotel = roomHotel;

    return await this.cartsRepository.save(cartItem);
  }

  // Existing getCartByUserId function
  async getCartByUserId(userId: string) {
    return await this.cartsRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
  }

  // create new cart
  async create(createCartDto: CreateCartDto) {
    const user = await this.usersService.findOne(createCartDto.userId);

    const destination = createCartDto.destinationId
      ? await this.destinationsService.findOne(createCartDto.destinationId)
      : null;

    const roomHotel = createCartDto.roomHotelId
      ? await this.roomHotelsService.findOne(createCartDto.roomHotelId)
      : null;

    const dataCart = new Cart();
    dataCart.quantity = createCartDto.quantity;
    dataCart.startDate = createCartDto.startDate;
    dataCart.endDate = createCartDto.endDate;
    dataCart.user = user;
    dataCart.destination = destination;
    dataCart.roomhotel = roomHotel;

    const result = await this.cartsRepository.insert(dataCart);

    return this.cartsRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.cartsRepository.findAndCount({
      relations: {
        booking: true,
        user: true,
        destination: true,
        roomhotel: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.cartsRepository.findOneOrFail({
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

  // update cart
  async update(id: string, updateCartDto: UpdateCartDto) {
    const user = await this.usersService.findOne(updateCartDto.userId);

    const destination = updateCartDto.destinationId
      ? await this.destinationsService.findOne(updateCartDto.destinationId)
      : null;

    const roomHotel = updateCartDto.roomHotelId
      ? await this.roomHotelsService.findOne(updateCartDto.roomHotelId)
      : null;

    let dataCart = new Cart();
    dataCart.quantity = updateCartDto.quantity;
    dataCart.startDate = updateCartDto.startDate;
    dataCart.endDate = updateCartDto.endDate;
    dataCart.user = user;
    dataCart.destination = destination;
    dataCart.roomhotel = roomHotel;

    try {
      await this.cartsRepository.findOneOrFail({
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

    const result = await this.cartsRepository.update(id, dataCart);

    return this.cartsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete cart
  async remove(id: string) {
    try {
      await this.cartsRepository.findOneOrFail({
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

    await this.cartsRepository.delete(id);
  }
}
