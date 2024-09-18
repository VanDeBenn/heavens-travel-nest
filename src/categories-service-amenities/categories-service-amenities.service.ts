import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateCategoriServiceAmenityDto } from './dto/create-categories-service-amenity.dto';
import { CategoriServiceAmenity } from './entities/categories-service-amenity.entity';

@Injectable()
export class CategoriServiceAmenitysService {
  constructor(
    @InjectRepository(CategoriServiceAmenity)
    private categoriserviceamenitysRepository: Repository<CategoriServiceAmenity>,
  ) {}

  // create new categoriserviceamenity
  async create(createCategoriServiceAmenityDto: CreateCategoriServiceAmenityDto) {
    const dataCategoriServiceAmenity = new CategoriServiceAmenity();


    const result = await this.categoriserviceamenitysRepository.insert(dataCategoriServiceAmenity);

    return this.categoriserviceamenitysRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.categoriserviceamenitysRepository.findAndCount({
      relations: {
        serviceamenities: true,
        hotel: true,
        roomhotel: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.categoriserviceamenitysRepository.findOneOrFail({
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

  // update categoriserviceamenity
  async update(id: string, updateCategoriServiceAmenityDto: CreateCategoriServiceAmenityDto) {
    let dataCategoriServiceAmenity = new CategoriServiceAmenity();


    try {
      await this.categoriserviceamenitysRepository.findOneOrFail({
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

    const result = await this.categoriserviceamenitysRepository.update(id, dataCategoriServiceAmenity);

    return this.categoriserviceamenitysRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete categoriserviceamenity
  async remove(id: string) {
    try {
      await this.categoriserviceamenitysRepository.findOneOrFail({
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

    await this.categoriserviceamenitysRepository.delete(id);
  }
}

