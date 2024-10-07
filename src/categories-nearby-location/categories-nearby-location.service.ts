import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CategoriesNearbyLocation } from './entities/categories-nearby-location.entity';
import { UpdateCategoriesNearbyLocationDto } from './dto/update-categories-nearby-location.dto';
import { CreateCategoriesNearbyLocationDto } from './dto/create-categories-nearby-location.dto';
import { HotelsService } from '#/hotels/hotels.service';

@Injectable()
export class CategoriesNearbyLocationsService {
  constructor(
    @InjectRepository(CategoriesNearbyLocation)
    private categoriesnearbylocationsRepository: Repository<CategoriesNearbyLocation>,
    private hotelService: HotelsService,
  ) {}

  // create new categoriesnearbylocation
  async create(createCategoriesNearbyLocationDto: CreateCategoriesNearbyLocationDto) {
    const hotel = await this.hotelService.findOne(createCategoriesNearbyLocationDto.hotelId);

    const dataCategoriesNearbyLocation = new CategoriesNearbyLocation();
    dataCategoriesNearbyLocation.title = createCategoriesNearbyLocationDto.title
    dataCategoriesNearbyLocation.hotel = hotel;

    const result = await this.categoriesnearbylocationsRepository.insert(dataCategoriesNearbyLocation);

    return this.categoriesnearbylocationsRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.categoriesnearbylocationsRepository.findAndCount({
      relations: {
        nearbylocations: true,
        hotel: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.categoriesnearbylocationsRepository.findOneOrFail({
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

  // update categoriesnearbylocation
  async update(id: string, updateCategoriesNearbyLocationDto: UpdateCategoriesNearbyLocationDto) {
    const hotel = await this.hotelService.findOne(updateCategoriesNearbyLocationDto.hotelId);

    let dataCategoriesNearbyLocation = new CategoriesNearbyLocation();
    dataCategoriesNearbyLocation.title = updateCategoriesNearbyLocationDto.title
    dataCategoriesNearbyLocation.hotel = hotel;

    try {
      await this.categoriesnearbylocationsRepository.findOneOrFail({
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

    const result = await this.categoriesnearbylocationsRepository.update(id, dataCategoriesNearbyLocation);

    return this.categoriesnearbylocationsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete categoriesnearbylocation
  async remove(id: string) {
    try {
      await this.categoriesnearbylocationsRepository.findOneOrFail({
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

    await this.categoriesnearbylocationsRepository.delete(id);
  }
}

