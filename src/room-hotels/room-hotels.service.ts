import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { RoomHotel } from './entities/room-hotel.entity';
import { CreateRoomHotelDto } from './dto/create-room-hotel.dto';
import { UpdateRoomHotelDto } from './dto/update-room-hotel.dto';

@Injectable()
export class RoomHotelsService {
  hotelService: any;
  constructor(
    @InjectRepository(RoomHotel)
    private roomhotelsRepository: Repository<RoomHotel>,
  ) {}

  // create new roomhotel
  async create(createRoomHotelDto: CreateRoomHotelDto) {
    const hotel = await this.hotelService.findOne(createRoomHotelDto.hotelId);

    const dataRoomHotel = new RoomHotel();
    dataRoomHotel.numberRoom = createRoomHotelDto.numberRoom;
    dataRoomHotel.price = createRoomHotelDto.price;
    dataRoomHotel.adult = createRoomHotelDto.adult;
    dataRoomHotel.children = createRoomHotelDto.children;
    dataRoomHotel.singleBed = createRoomHotelDto.singleBed;
    dataRoomHotel.doubleBed = createRoomHotelDto.doubleBed;
    dataRoomHotel.kingBed = createRoomHotelDto.kingBed;
    dataRoomHotel.children = createRoomHotelDto.queenBed;
    dataRoomHotel.hotel = hotel;

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
    const hotel = await this.hotelService.findOne(updateRoomHotelDto.hotelId);

    let dataRoomHotel = new RoomHotel();
    dataRoomHotel.numberRoom = updateRoomHotelDto.numberRoom;
    dataRoomHotel.price = updateRoomHotelDto.price;
    dataRoomHotel.adult = updateRoomHotelDto.adult;
    dataRoomHotel.children = updateRoomHotelDto.children;
    dataRoomHotel.singleBed = updateRoomHotelDto.singleBed;
    dataRoomHotel.doubleBed = updateRoomHotelDto.doubleBed;
    dataRoomHotel.kingBed = updateRoomHotelDto.kingBed;
    dataRoomHotel.children = updateRoomHotelDto.queenBed;
    dataRoomHotel.hotel = hotel;

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
