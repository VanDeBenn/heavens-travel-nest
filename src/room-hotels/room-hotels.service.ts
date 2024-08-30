import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoomHotelDto } from './dto/create-room-hotel.dto';
import { UpdateRoomHotelDto } from './dto/update-room-hotel.dto';
import { RoomHotel } from './entities/room-hotel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class RoomHotelsService {
  constructor(
    @InjectRepository(RoomHotel)
    private roomHotelsRepository: Repository<RoomHotel>,
  ) {}

  // create new roomHotel
  async create(createRoomHotelDto: CreateRoomHotelDto) {
    const dataRoomHotel = new RoomHotel();

    const result = await this.roomHotelsRepository.insert(dataRoomHotel);

    return this.roomHotelsRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.roomHotelsRepository.findAndCount({
      relations: {},
    });
  }

  async findOne(id: string) {
    try {
      return await this.roomHotelsRepository.findOneOrFail({
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

  // update roomHotel
  async update(id: string, updateRoomHotelDto: UpdateRoomHotelDto) {
    let dataRoomHotel = new RoomHotel();

    try {
      await this.roomHotelsRepository.findOneOrFail({
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

    const result = await this.roomHotelsRepository.update(
      id,
      updateRoomHotelDto,
    );

    return this.roomHotelsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete roomHotel
  async remove(id: string) {
    try {
      await this.roomHotelsRepository.findOneOrFail({
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

    await this.roomHotelsRepository.delete(id);
  }
}
