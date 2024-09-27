import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { RoomType } from './entities/room-type.entity';
import { CreateRoomTypeDto } from './dto/create-room-type.dto';
import { UpdateRoomTypeDto } from './dto/update-room-type.dto';

@Injectable()
export class RoomTypeService {
  roomHotelService: any;
  constructor(
    @InjectRepository(RoomType)
    private roomtypesRepository: Repository<RoomType>,
  ) {}

  // create new roomtype
  async create(createRoomTypeDto: CreateRoomTypeDto) {
    const roomHotel = await this.roomHotelService.findOne(createRoomTypeDto.roomHotelId);

    const dataRoomType = new RoomType();
    dataRoomType.name = createRoomTypeDto.name;
    dataRoomType.roomhotel = roomHotel;

    const result = await this.roomtypesRepository.insert(dataRoomType);

    return this.roomtypesRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.roomtypesRepository.findAndCount({
      relations: {
        roomhotel: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.roomtypesRepository.findOneOrFail({
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

  // update roomtype
  async update(id: string, updateRoomTypeDto: UpdateRoomTypeDto) {
    const roomHotel = await this.roomHotelService.findOne(updateRoomTypeDto.roomHotelId);

    let dataRoomType = new RoomType();
    dataRoomType.name = updateRoomTypeDto.name;
    dataRoomType.roomhotel = roomHotel;

    try {
      await this.roomtypesRepository.findOneOrFail({
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

    const result = await this.roomtypesRepository.update(id, dataRoomType);

    return this.roomtypesRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete roomtype
  async remove(id: string) {
    try {
      await this.roomtypesRepository.findOneOrFail({
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

    await this.roomtypesRepository.delete(id);
  }
}
