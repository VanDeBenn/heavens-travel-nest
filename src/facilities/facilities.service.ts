import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { Facility } from './entities/facility.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { HotelsService } from '#/hotels/hotels.service';
import { ServiceAmenitysService } from '#/service-amenities/service-amenities.service';

@Injectable()
export class FacilitiesService {
  constructor(
    @InjectRepository(Facility)
    private facilitiesRepository: Repository<Facility>,
    private hotelsService: HotelsService,
    private serviceAmenitysService: ServiceAmenitysService,
  ) {}

  // create new facility
  async create(createFacilityDto: CreateFacilityDto) {
    const hotel = await this.hotelsService.findOne(createFacilityDto.hotelId);
    const service = await this.serviceAmenitysService.findOne(
      createFacilityDto.serviceAmenitiesId,
    );

    const dataFacility = new Facility();
    dataFacility.hotels = hotel;
    dataFacility.serviceAmenities = service;
    dataFacility.status = createFacilityDto.status;

    const result = await this.facilitiesRepository.insert(dataFacility);

    return this.facilitiesRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.facilitiesRepository.findAndCount({
      relations: {
        hotels: true,
        serviceAmenities: true,

        // users: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.facilitiesRepository.findOneOrFail({
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

  // update facility
  async update(id: string, updateFacilityDto: UpdateFacilityDto) {
    let dataFacility = new Facility();
    // // dataFacility.name = dataFacility.name;

    try {
      await this.facilitiesRepository.findOneOrFail({
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

    const result = await this.facilitiesRepository.update(id, dataFacility);

    return this.facilitiesRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete facility
  async remove(id: string) {
    try {
      await this.facilitiesRepository.findOneOrFail({
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

    await this.facilitiesRepository.delete(id);
  }
}
