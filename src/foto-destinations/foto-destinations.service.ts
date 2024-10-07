import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { PhotoDestination } from './entities/foto-destination.entity';
import { CreatePhotoDestinationDto } from './dto/create-foto-destination.dto';
import { UpdatePhotoDestinationDto } from './dto/update-foto-destination.dto';
import { DestinationsService } from '#/destinations/destinations.service';

@Injectable()
export class PhotoDestinationsService {
  constructor(
    @InjectRepository(PhotoDestination)
    private photodestinationsRepository: Repository<PhotoDestination>,
    private destinationService: DestinationsService,
  ) {}

  // create new photodestination
  async create(createPhotoDestinationDto: CreatePhotoDestinationDto) {
    const destination = await this.destinationService.findOne(createPhotoDestinationDto.destinationId);

    const dataPhotoDestination = new PhotoDestination();
    dataPhotoDestination.pathPhoto = createPhotoDestinationDto.pathPhoto;
    dataPhotoDestination.destination = destination;

    const result = await this.photodestinationsRepository.insert(dataPhotoDestination);

    return this.photodestinationsRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.photodestinationsRepository.findAndCount({
      relations: {
        destination: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.photodestinationsRepository.findOneOrFail({
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

  // update photodestination
  async update(id: string, updatePhotoDestinationDto: UpdatePhotoDestinationDto) {
    const destination = await this.destinationService.findOne(updatePhotoDestinationDto.destinationId);

    let dataPhotoDestination = new PhotoDestination();
    dataPhotoDestination.pathPhoto = updatePhotoDestinationDto.pathPhoto;
    dataPhotoDestination.destination = destination;

    try {
      await this.photodestinationsRepository.findOneOrFail({
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

    const result = await this.photodestinationsRepository.update(id, dataPhotoDestination);

    return this.photodestinationsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete photodestination
  async remove(id: string) {
    try {
      await this.photodestinationsRepository.findOneOrFail({
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

    await this.photodestinationsRepository.delete(id);
  }
}
