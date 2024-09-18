import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { ServiceAmenity } from './entities/service-amenity.entity';
import { CreateServiceAmenityDto } from './dto/create-service-amenity.dto';
import { UpdateServiceAmenityDto } from './dto/update-service-amenity.dto';

@Injectable()
export class ServiceAmenitysService {
  constructor(
    @InjectRepository(ServiceAmenity)
    private serviceamenitysRepository: Repository<ServiceAmenity>,
  ) {}

  // create new serviceamenity
  async create(createServiceAmenityDto: CreateServiceAmenityDto) {
    const dataServiceAmenity = new ServiceAmenity();

    const result = await this.serviceamenitysRepository.insert(dataServiceAmenity);

    return this.serviceamenitysRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.serviceamenitysRepository.findAndCount({
      relations: {
        categoriserviceamenity: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.serviceamenitysRepository.findOneOrFail({
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

  // update serviceamenity
  async update(id: string, updateServiceAmenityDto: UpdateServiceAmenityDto) {
    let dataServiceAmenity = new ServiceAmenity();
    try {
      await this.serviceamenitysRepository.findOneOrFail({
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

    const result = await this.serviceamenitysRepository.update(id, dataServiceAmenity);

    return this.serviceamenitysRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete serviceamenity
  async remove(id: string) {
    try {
      await this.serviceamenitysRepository.findOneOrFail({
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

    await this.serviceamenitysRepository.delete(id);
  }
}
