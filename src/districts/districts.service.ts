import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { District } from './entities/district.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class DistrictsService {
  constructor(
    @InjectRepository(District)
    private districtsRepository: Repository<District>,
  ) {}

  // create new district
  async create(createDistrictDto: CreateDistrictDto) {
    const dataDistrict = new District();

    const result = await this.districtsRepository.insert(dataDistrict);

    return this.districtsRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.districtsRepository.findAndCount({
      relations: {},
    });
  }

  async findOne(id: string) {
    try {
      return await this.districtsRepository.findOneOrFail({
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

  // update district
  async update(id: string, updateDistrictDto: UpdateDistrictDto) {
    let dataDistrict = new District();

    try {
      await this.districtsRepository.findOneOrFail({
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

    const result = await this.districtsRepository.update(id, updateDistrictDto);

    return this.districtsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete district
  async remove(id: string) {
    try {
      await this.districtsRepository.findOneOrFail({
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

    await this.districtsRepository.delete(id);
  }
}
