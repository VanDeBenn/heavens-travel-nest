import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { Destination } from './entities/destination.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectRepository(Destination)
    private destinationsRepository: Repository<Destination>,
  ) {}

  async create(createDestinationDto: CreateDestinationDto) {
    const dataDestination = new Destination();
    dataDestination.name = createDestinationDto.name;
    dataDestination.priceAdult = createDestinationDto.priceAdult;
    dataDestination.priceChildren = createDestinationDto.priceChildren;
    dataDestination.maxCapacity = createDestinationDto.maxCapacity;
    dataDestination.description = createDestinationDto.description;
    dataDestination.address = createDestinationDto.address;
    dataDestination.pathLocation = createDestinationDto.pathLocation;

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

  async update(id: string, updateDestinationDto: UpdateDestinationDto) {
    const dataDestination = new Destination();
    dataDestination.name = updateDestinationDto.name;
    dataDestination.priceAdult = updateDestinationDto.priceAdult;
    dataDestination.priceChildren = updateDestinationDto.priceChildren;
    dataDestination.maxCapacity = updateDestinationDto.maxCapacity;
    dataDestination.description = updateDestinationDto.description;
    dataDestination.address = updateDestinationDto.address;
    dataDestination.pathLocation = updateDestinationDto.pathLocation;

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

    await this.destinationsRepository.update(id, dataDestination);

    return this.destinationsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

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
