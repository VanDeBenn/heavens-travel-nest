import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCountrysDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class CountrysService {
  constructor(
    @InjectRepository(Country)
    private countrysRepository: Repository<Country>,
  ) {}

  // create new country
  async create(createCountryDto: CreateCountrysDto) {
    const dataCountry = new Country();
    dataCountry.name = createCountryDto.name;

    const result = await this.countrysRepository.insert(dataCountry);

    return this.countrysRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.countrysRepository.findAndCount({
      relations: {
        provinces: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.countrysRepository.findOneOrFail({
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

  // update country
  async update(id: string, updateCountryDto: UpdateCountryDto) {
    let dataCountry = new Country();
    dataCountry.name = updateCountryDto.name;

    try {
      await this.countrysRepository.findOneOrFail({
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

    const result = await this.countrysRepository.update(id, dataCountry);

    return this.countrysRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete country
  async remove(id: string) {
    try {
      await this.countrysRepository.findOneOrFail({
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

    await this.countrysRepository.delete(id);
  }
}
