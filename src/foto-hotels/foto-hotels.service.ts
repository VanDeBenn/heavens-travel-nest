import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { PhotoHotel } from './entities/foto-hotel.entity';
import { CreatePhotoHotelDto } from './dto/create-foto-hotel.dto';
import { UpdatePhotoHotelDto } from './dto/update-foto-hotel.dto';
import { HotelsService } from '#/hotels/hotels.service';

@Injectable()
export class PhotoHotelsService {
  constructor(
    @InjectRepository(PhotoHotel)
    private photohotelsRepository: Repository<PhotoHotel>,
    private hotelService: HotelsService,
  ) {}

  // create new photohotel
  async create(createPhotoHotelDto: CreatePhotoHotelDto) {
    const hotel = await this.hotelService.findOne(createPhotoHotelDto.hotelId);

    const dataPhotoHotel = new PhotoHotel();
    dataPhotoHotel.pathPhoto = createPhotoHotelDto.pathPhoto;
    dataPhotoHotel.hotel = hotel;

    const result = await this.photohotelsRepository.insert(dataPhotoHotel);

    return this.photohotelsRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.photohotelsRepository.findAndCount({
      relations: {
        hotel: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.photohotelsRepository.findOneOrFail({
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

  // update photohotel
  async update(id: string, updatePhotoHotelDto: UpdatePhotoHotelDto) {
    const hotel = await this.hotelService.findOne(updatePhotoHotelDto.hotelId);

    let dataPhotoHotel = new PhotoHotel();
    dataPhotoHotel.pathPhoto = updatePhotoHotelDto.pathPhoto;
    dataPhotoHotel.hotel = hotel;

    try {
      await this.photohotelsRepository.findOneOrFail({
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

    const result = await this.photohotelsRepository.update(id, dataPhotoHotel);

    return this.photohotelsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete photohotel
  async remove(id: string) {
    try {
      await this.photohotelsRepository.findOneOrFail({
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

    await this.photohotelsRepository.delete(id);
  }
}
