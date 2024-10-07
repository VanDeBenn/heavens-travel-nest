import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { Province } from './entities/province.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CountrysService } from '#/countries/countries.service';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(Province)
    private provincesRepository: Repository<Province>,
    private countryService: CountrysService,
  ) {}

  // create new province
  async create(createProvinceDto: CreateProvinceDto) {
    const country = await this.countryService.findOne(createProvinceDto.countryId);

    const dataProvince = new Province();
    dataProvince.name = createProvinceDto.name;
    dataProvince.country = country;

    const result = await this.provincesRepository.insert(dataProvince);

    return this.provincesRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.provincesRepository.findAndCount({
      relations: {
        cities: true,
        country: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.provincesRepository.findOneOrFail({
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

  // update province
  async update(id: string, updateProvinceDto: UpdateProvinceDto) {
    const country = await this.countryService.findOne(updateProvinceDto.countryId);

    let dataProvince = new Province();
    dataProvince.name = updateProvinceDto.name;
    dataProvince.country = country;

    try {
      await this.provincesRepository.findOneOrFail({
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

    const result = await this.provincesRepository.update(id, dataProvince);

    return this.provincesRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete province
  async remove(id: string) {
    try {
      await this.provincesRepository.findOneOrFail({
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

    await this.provincesRepository.delete(id);
  }
}
