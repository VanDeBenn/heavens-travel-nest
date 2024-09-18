import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { RoomHotel } from './entities/room-hotel.entity';
import { CreateRoomHotelDto } from './dto/create-room-hotel.dto';
import { UpdateRoomHotelDto } from './dto/update-room-hotel.dto';

@Injectable()
export class RoomHotelsService {
  constructor(
    @InjectRepository(RoomHotel)
    private roomhotelsRepository: Repository<RoomHotel>,
  ) {}

  // create new roomhotel
  async create(createRoomHotelDto: CreateRoomHotelDto) {
    const dataRoomHotel = new RoomHotel();

    const result = await this.roomhotelsRepository.insert(dataRoomHotel);

    return this.roomhotelsRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.roomhotelsRepository.findAndCount({
      relations: {
        bookingdetails: true,
        categoriserviceamenities: true,
        carts: true,
        photoroomhotels: true,
        hotel: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.roomhotelsRepository.findOneOrFail({
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

  // update roomhotel
  async update(id: string, updateRoomHotelDto: UpdateRoomHotelDto) {
    let dataRoomHotel = new RoomHotel();

    try {
      await this.roomhotelsRepository.findOneOrFail({
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

    const result = await this.roomhotelsRepository.update(id, dataRoomHotel);

    return this.roomhotelsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete roomhotel
  async remove(id: string) {
    try {
      await this.roomhotelsRepository.findOneOrFail({
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

    await this.roomhotelsRepository.delete(id);
  }
}
