import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class CartService {
  userService: any;
  destinationService: any;
  roomHotelService: any;
  constructor(
    @InjectRepository(Cart)
    private cartsRepository: Repository<Cart>,
  ) {}

  // create new cart
  async create(createCartDto: CreateCartDto) {
    const user = await this.userService.findOne(createCartDto.userId);

    const destination = createCartDto.destinationId
      ? await this.destinationService.findOne(createCartDto.destinationId)
      : null;

    const roomHotel = createCartDto.roomHotelId
      ? await this.roomHotelService.findOne(createCartDto.roomHotelId)
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
    const user = await this.userService.findOne(updateCartDto.userId);

    const destination = updateCartDto.destinationId
      ? await this.destinationService.findOne(updateCartDto.destinationId)
      : null;

    const roomHotel = updateCartDto.roomHotelId
      ? await this.roomHotelService.findOne(updateCartDto.roomHotelId)
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
