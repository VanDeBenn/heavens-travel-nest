import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCountrysDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { map } from 'rxjs/operators';

@Injectable()
export class CountrysService {
  constructor(
    private httpService: HttpService,
    @InjectRepository(Country)
    private countrysRepository: Repository<Country>,
  ) {}

  async fetchAndStoreCountries() {
    const apiUrl =
      'https://countriesnow.space/api/v0.1/countries/population/cities';

    const response = await this.httpService
      .get(apiUrl)
      .pipe(map((response) => response.data))
      .toPromise();

    const countries = response.data.map((item) => item.country);

    for (const countryName of countries) {
      const existingCountry = await this.countrysRepository.findOne({
        where: { name: countryName },
      });

      if (!existingCountry) {
        const country = new Country();
        country.name = countryName;
        await this.countrysRepository.save(country);
        console.log(`Country saved: ${countryName}`);
      } else {
        console.log(`Country already exists: ${countryName}`);
      }
    }

    return 'Countries processing completed!';
  }

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
      relations: {},
    });
  }

  async findOne(id: string) {
    try {
      return await this.countrysRepository.findOneOrFail({
        where: {
          id,
        },
        relations: { provinces: true },
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
