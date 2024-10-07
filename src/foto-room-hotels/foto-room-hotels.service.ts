import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { PhotoRoomHotel } from './entities/foto-room-hotel.entity';
import { CreatePhotoRoomHotelDto } from './dto/create-foto-room-hotel.dto';
import { UpdatePhotoRoomHotelDto } from './dto/update-foto-room-hotel.dto';
import { RoomHotelsService } from '#/room-hotels/room-hotels.service';

@Injectable()
export class PhotoRoomHotelsService {
  constructor(
    @InjectRepository(PhotoRoomHotel)
    private photoroomhotelsRepository: Repository<PhotoRoomHotel>,
    private roomHotelService: RoomHotelsService,
  ) {}

  // create new photoroomhotel
  async create(createPhotoRoomHotelDto: CreatePhotoRoomHotelDto) {
    const roomHotel = await this.roomHotelService.findOne(createPhotoRoomHotelDto.roomHotelId);

    const dataPhotoRoomHotel = new PhotoRoomHotel();
    dataPhotoRoomHotel.pathPhoto = createPhotoRoomHotelDto.pathPhoto;
    dataPhotoRoomHotel.roomhotel = roomHotel;

    const result = await this.photoroomhotelsRepository.insert(dataPhotoRoomHotel);

    return this.photoroomhotelsRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.photoroomhotelsRepository.findAndCount({
      relations: {
        roomhotel: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.photoroomhotelsRepository.findOneOrFail({
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

  // update photoroomhotel
  async update(id: string, updatePhotoRoomHotelDto: UpdatePhotoRoomHotelDto) {
    const roomHotel = await this.roomHotelService.findOne(updatePhotoRoomHotelDto.roomHotelId);

    let dataPhotoRoomHotel = new PhotoRoomHotel();
    dataPhotoRoomHotel.pathPhoto = updatePhotoRoomHotelDto.pathPhoto;
    dataPhotoRoomHotel.roomhotel = roomHotel;


    try {
      await this.photoroomhotelsRepository.findOneOrFail({
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

    const result = await this.photoroomhotelsRepository.update(id, dataPhotoRoomHotel);

    return this.photoroomhotelsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete photoroomhotel
  async remove(id: string) {
    try {
      await this.photoroomhotelsRepository.findOneOrFail({
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

    await this.photoroomhotelsRepository.delete(id);
  }
}
