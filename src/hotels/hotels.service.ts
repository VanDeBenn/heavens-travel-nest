import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Hotel } from './entities/hotel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel)
    private hotelsRepository: Repository<Hotel>,
  ) {}

  // create new hotel
  async create(createHotelDto: CreateHotelDto) {
    const dataHotel = new Hotel();
    dataHotel.name = createHotelDto.name;

    const result = await this.hotelsRepository.insert(dataHotel);

    return this.hotelsRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.hotelsRepository.findAndCount({
      relations: {
        wishlists: true,
        categorisomehelpfulfacts: true,
        categoriesnearbylocations: true,
        categoriesfaqs: true,
        photohotels: true,
        categoriserviceamenities: true,
        roomHotels: true,
        propertypolicys: true,
        district: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.hotelsRepository.findOneOrFail({
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

  // update hotel
  async update(id: string, updateHotelDto: UpdateHotelDto) {
    let dataHotel = new Hotel();
    dataHotel.name = dataHotel.name;

    try {
      await this.hotelsRepository.findOneOrFail({
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

    const result = await this.hotelsRepository.update(id, dataHotel);

    return this.hotelsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete hotel
  async remove(id: string) {
    try {
      await this.hotelsRepository.findOneOrFail({
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

    await this.hotelsRepository.delete(id);
  }
}
