import { BookingsService } from '#/bookings/bookings.service';
import { RoomHotelsService } from './../room-hotels/room-hotels.service';
import { DestinationsService } from './../destinations/destinations.service';
import { UsersService } from '#/users/users.service';
import {
  BadRequestException,
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
    private bookingsService: BookingsService,
  ) {}

  // create new cart
  async create(id: string) {
    const user = await this.usersService.findOne(id);

    // const destination = createCartDto.destinationId
    //   ? await this.destinationsService.findOne(createCartDto.destinationId)
    //   : null;

    // const roomHotel = createCartDto.roomHotelId
    //   ? await this.roomHotelsService.findOne(createCartDto.roomHotelId)
    //   : null;

    const dataCart = new Cart();
    // dataCart.quantityAdult = createCartDto.quantityAdult;
    // dataCart.quantityChildren = createCartDto.quantityChildren;
    // dataCart.startDate = createCartDto.startDate;
    // dataCart.endDate = createCartDto.endDate;
    dataCart.user = user;
    // dataCart.destination = destination;
    // dataCart.roomhotel = roomHotel;

    const result = await this.cartsRepository.insert(dataCart);

    return this.cartsRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  // async addDestinationToCart(dto: {
  //   userId: string;
  //   cartId: string;
  //   destinationId: string;
  // }) {
  //   const user = await this.usersService.findOne(dto.userId);
  //   if (!user) throw new Error('User not found');

  //   const cart = await this.cartsRepository.findOne({
  //     where: { id: dto.cartId, user: { id: dto.userId } },
  //     relations: { destination: true },
  //   });
  //   if (!cart) throw new Error('Cart not found');

  //   const destination = await this.destinationsService.findOne(
  //     dto.destinationId,
  //   );
  //   if (!destination) throw new Error('Destination not found');

  //   if (cart.destination.some((d) => d.id === destination.id)) {
  //     throw new Error('Destination already in cart');
  //   }

  //   cart.destination.push(destination);

  //   return this.cartsRepository.save(cart);
  // }

  // Add to Cart function
  async addToCart(createCartDto: CreateCartDto) {
    const user = await this.usersService.findOne(createCartDto.userId);
    const destination = createCartDto.destinationId
      ? await this.destinationsService.findOne(createCartDto.destinationId)
      : null;
    const roomHotel = createCartDto.roomHotelId
      ? await this.roomHotelsService.findOne(createCartDto.roomHotelId)
      : null;
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // // Validasi minimal salah satu ada antara destination atau roomHotel
    // if (!destination && !roomHotel) {
    //   throw new BadRequestException(
    //     'Either destination or room hotel must be provided',
    //   );
    // }

    const cartItem = new Cart();
    cartItem.user = user;
    cartItem.destination = destination;
    cartItem.roomHotel = roomHotel;
    cartItem.quantityRoom = createCartDto.quantityRoom;
    cartItem.quantityAdult = createCartDto.quantityAdult;
    cartItem.quantityChildren = createCartDto.quantityChildren;
    cartItem.startDate = createCartDto.startDate;
    cartItem.endDate = createCartDto.endDate;

    return await this.cartsRepository.save(cartItem);
  }

  // addBook(createCartDto: CreateCartDto) {
  //   const data = new Cart();
  //   data.bookingDetail =
  // }

  // async addRoomHotelToCart(dto: {
  //   userId: string;
  //   cartId: string;
  //   roomHotelId: string;
  // }) {
  //   const user = await this.usersService.findOne(dto.userId);
  //   if (!user) throw new Error('User not found');

  //   const cart = await this.cartsRepository.findOne({
  //     where: { id: dto.cartId, user: { id: dto.userId } },
  //     relations: { roomHotel: true },
  //   });
  //   if (!cart) throw new Error('Cart not found');

  //   const roomHotel = await this.roomHotelsService.findOne(dto.roomHotelId);
  //   if (!roomHotel) throw new Error('Room Hotel not found');

  //   if (cart.roomHotel.some((d) => d.id === roomHotel.id)) {
  //     throw new Error('Room Hotel already in cart');
  //   }

  //   cart.roomHotel.push(roomHotel);

  //   return this.cartsRepository.save(cart);
  // }

  // async removeDestinationFromCart(dto: {
  //   userId: string;
  //   cartId: string;
  //   destinationId: string;
  // }) {
  //   const cart = await this.findOne(dto.cartId);
  //   if (!cart.destination) {
  //     throw new Error('No destinations found in the cart');
  //   }

  //   const destination = cart.destination.findIndex(
  //     (d) => d.id === dto.destinationId,
  //   );
  //   if (destination === -1) {
  //     throw new Error('Destination not found in cart');
  //   }

  //   cart.destination.splice(destination, 1);
  //   return this.cartsRepository.save(cart);
  // }

  // async removeRoomHotelFromCart(dto: {
  //   userId: string;
  //   cartId: string;
  //   roomHotelId: string;
  // }) {
  //   const cart = await this.findOne(dto.cartId);

  //   const roomHotel = cart.roomHotel.findIndex((h) => h.id === dto.roomHotelId);

  //   if (roomHotel === -1) {
  //     throw new Error('RoomHotel not found in cart');
  //   }

  //   cart.roomHotel.splice(roomHotel, 1);
  //   return this.cartsRepository.save(cart);
  // }

  findAll() {
    return this.cartsRepository.findAndCount({
      relations: {
        user: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.cartsRepository.findOneOrFail({
        where: {
          id,
        },
        relations: {
          booking: true,
          bookingDetail: true,
          destination: true,
          roomHotel: true,
          // roomhotel: true,
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
    // const user = await this.usersService.findOne(updateCartDto.userId);
    const booking = await this.bookingsService.findOne(updateCartDto.bookingId);

    // const destination = updateCartDto.destinationId
    //   ? await this.destinationsService.findOne(updateCartDto.destinationId)
    //   : null;

    // const roomHotel = updateCartDto.roomHotelId
    //   ? await this.roomHotelsService.findOne(updateCartDto.roomHotelId)
    //   : null;

    let dataCart = new Cart();
    // dataCart.quantityAdult = updateCartDto.quantityAdult;
    // dataCart.quantityChildren = updateCartDto.quantityChildren;
    // dataCart.startDate = updateCartDto.startDate;
    // dataCart.endDate = updateCartDto.endDate;
    dataCart.booking = booking;
    // dataCart.destination = destination;
    // dataCart.roomhotel = roomHotel;

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
