import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { NearbyLocation } from './entities/nearby-location.entity';
import { CreateNearbyLocationDto } from './dto/create-nearby-location.dto';
import { UpdateNearbyLocationDto } from './dto/update-nearby-location.dto';
import { CategoriesNearbyLocationsService } from '#/categories-nearby-location/categories-nearby-location.service';
import { HotelsService } from '#/hotels/hotels.service';

@Injectable()
export class NearbyLocationService {
  constructor(
    @InjectRepository(NearbyLocation)
    private nearbylocationRepository: Repository<NearbyLocation>,
    private categoriesNearbyLocationService: CategoriesNearbyLocationsService,
    private hotelsService: HotelsService,
  ) {}

  // create new nearbylocation
  async create(createNearbyLocationDto: CreateNearbyLocationDto) {
    const categoriesNearbyLocation =
      await this.categoriesNearbyLocationService.findOne(
        createNearbyLocationDto.categoriesNearbyLocationId,
      );

    const hotel = await this.hotelsService.findOne(
      createNearbyLocationDto.hotelId,
    );

    const dataNearbyLocation = new NearbyLocation();
    dataNearbyLocation.location = createNearbyLocationDto.location;
    dataNearbyLocation.distance = createNearbyLocationDto.distance;
    dataNearbyLocation.categoriesnearbylocation = categoriesNearbyLocation;
    dataNearbyLocation.hotel = hotel;

    const result = await this.nearbylocationRepository.insert(
      dataNearbyLocation,
    );

    return this.nearbylocationRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.nearbylocationRepository.findAndCount({
      relations: {
        categoriesnearbylocation: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.nearbylocationRepository.findOneOrFail({
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

  // update nearbylocation
  async update(id: string, updateNearbyLocationDto: UpdateNearbyLocationDto) {
    const categoriesNearbyLocation =
      await this.categoriesNearbyLocationService.findOne(
        updateNearbyLocationDto.categoriesNearbyLocationId,
      );

    let dataNearbyLocation = new NearbyLocation();
    // dataNearbyLocation.title = updateNearbyLocationDto.title;
    dataNearbyLocation.categoriesnearbylocation = categoriesNearbyLocation;

    try {
      await this.nearbylocationRepository.findOneOrFail({
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

    const result = await this.nearbylocationRepository.update(
      id,
      dataNearbyLocation,
    );

    return this.nearbylocationRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete nearbylocation
  async remove(id: string) {
    try {
      await this.nearbylocationRepository.findOneOrFail({
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

    await this.nearbylocationRepository.delete(id);
  }
}
