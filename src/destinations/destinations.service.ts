import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { Destination } from './entities/destination.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class DestinationsService {
  districtService: any;
  constructor(
    @InjectRepository(Destination)
    private destinationsRepository: Repository<Destination>,
  ) {}

  // create new destination
  async create(createDestinationDto: CreateDestinationDto) {
    const district = await this.districtService.findOne(createDestinationDto.districtId);

    const dataDestination = new Destination();
    dataDestination.name = createDestinationDto.name;
    dataDestination.priceAdult;
    dataDestination.priceChildren = createDestinationDto.priceChildren;
    dataDestination.maxCapacity = createDestinationDto.maxCapacity;
    dataDestination.rating = createDestinationDto.rating;
    dataDestination.description = createDestinationDto.description;
    dataDestination.address = createDestinationDto.address;
    dataDestination.pathLocation = createDestinationDto.pathLocation;
    dataDestination.district = district

    const result = await this.destinationsRepository.insert(dataDestination);

    return this.destinationsRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.destinationsRepository.findAndCount({
      relations: {
        blogs: true,
        wishlists: true,
        carts: true,
        photodestinations: true,
        categoriesfaqs: true,
        bookingdetails: true,
        district: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.destinationsRepository.findOneOrFail({
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

  // update destination
  async update(id: string, updateDestinationDto: UpdateDestinationDto) {
    const district = await this.districtService.findOne(updateDestinationDto.districtId);

    let dataDestination = new Destination();
    dataDestination.name = updateDestinationDto.name;
    dataDestination.priceAdult;
    dataDestination.priceChildren = updateDestinationDto.priceChildren;
    dataDestination.maxCapacity = updateDestinationDto.maxCapacity;
    dataDestination.rating = updateDestinationDto.rating;
    dataDestination.description = updateDestinationDto.description;
    dataDestination.address = updateDestinationDto.address;
    dataDestination.pathLocation = updateDestinationDto.pathLocation;
    dataDestination.district = district;

    try {
      await this.destinationsRepository.findOneOrFail({
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

    const result = await this.destinationsRepository.update(id, dataDestination);

    return this.destinationsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete destination
  async remove(id: string) {
    try {
      await this.destinationsRepository.findOneOrFail({
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

    await this.destinationsRepository.delete(id);
  }
}
