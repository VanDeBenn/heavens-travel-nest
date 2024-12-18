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
  async create(
    createCategoriesNearbyLocationDto: CreateCategoriesNearbyLocationDto,
  ) {
    const dataCategoriesNearbyLocation = new CategoriesNearbyLocation();
    dataCategoriesNearbyLocation.title =
      createCategoriesNearbyLocationDto.title;

    const result = await this.categoriesnearbylocationsRepository.insert(
      dataCategoriesNearbyLocation,
    );

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
  async update(
    id: string,
    updateCategoriesNearbyLocationDto: UpdateCategoriesNearbyLocationDto,
  ) {
    let dataCategoriesNearbyLocation = new CategoriesNearbyLocation();
    dataCategoriesNearbyLocation.title =
      updateCategoriesNearbyLocationDto.title;

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

    const result = await this.categoriesnearbylocationsRepository.update(
      id,
      dataCategoriesNearbyLocation,
    );

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
