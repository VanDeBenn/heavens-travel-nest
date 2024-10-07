import { ProvinceService } from './../provinces/provinces.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class CitysService {
  constructor(
    @InjectRepository(City)
    private citysRepository: Repository<City>,
    private provinceService: ProvinceService,
  ) {}

  // create new city
  async create(createCityDto: CreateCityDto) {
    const province = await this.provinceService.findOne(createCityDto.provinceId);

    const dataCity = new City();
    dataCity.name = createCityDto.name;
    dataCity.province = province;

    const result = await this.citysRepository.insert(dataCity);

    return this.citysRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.citysRepository.findAndCount({
      relations: {
        districts: true,
        province: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.citysRepository.findOneOrFail({
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

  // update city
  async update(id: string, updateCityDto: UpdateCityDto) {
    const province = await this.provinceService.findOne(
      updateCityDto.provinceId,
    );

    let dataCity = new City();
    dataCity.name = updateCityDto.name;
    dataCity.province = province;

    try {
      await this.citysRepository.findOneOrFail({
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

    const result = await this.citysRepository.update(id, dataCity);

    return this.citysRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete city
  async remove(id: string) {
    try {
      await this.citysRepository.findOneOrFail({
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

    await this.citysRepository.delete(id);
  }
}
