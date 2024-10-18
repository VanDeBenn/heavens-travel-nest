import { DistrictsService } from '#/districts/districts.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { Destination } from './entities/destination.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CartService } from '#/cart/cart.service';
import { UsersService } from '#/users/users.service';
import { District } from '#/districts/entities/district.entity';
import { City } from '#/cities/entities/city.entity';
import { Province } from '#/provinces/entities/province.entity';
import { Country } from '#/countries/entities/country.entity';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectRepository(Destination)
    private destinationsRepository: Repository<Destination>,
    // @InjectRepository(District)
    // private districtRepository: Repository<District>,
    // @InjectRepository(City)
    // private cityRepository: Repository<City>,
    // @InjectRepository(Province)
    // private provinceRepository: Repository<Province>,
    // // @InjectRepository(Country)
    // private countryRepository: Repository<Country>,
    private districtsService: DistrictsService,
    private userService: UsersService,
  ) {}

  // create new destination
  async create(
    createDestinationDto: CreateDestinationDto,
    dto: {
      districtName: string;
      cityName: string;
      provinceName: string;
      countryName: string;
    },
  ) {
    // const district = await this.districtsService.findOne(
    //   createDestinationDto.districtId,
    // );

    // const district = await this.districtRepository.findOneOrFail({where: {name: dto.districtName}});
    // const districtId = district.id

    // const city = await this.cityRepository.findOneOrFail({where: {name: dto.cityName}})
    // const cityId = city.id

    // const province = await this.provinceRepository.findOneOrFail({where: {name: dto.provinceName}})
    // const provinceId = province.id

    // const country = await this.countryRepository.findOneOrFail({where: {name: dto.countryName}})
    // const countryId = country.id

    const dataDestination = new Destination();
    dataDestination.name = createDestinationDto.name;
    dataDestination.priceAdult = createDestinationDto.priceAdult;
    dataDestination.priceChildren = createDestinationDto.priceChildren;
    dataDestination.maxCapacity = createDestinationDto.maxCapacity;
    dataDestination.rating = createDestinationDto.rating;
    dataDestination.description = createDestinationDto.description;
    dataDestination.address = createDestinationDto.address;
    dataDestination.pathLocation = createDestinationDto.pathLocation;
    // dataDestination.district = district;
    // dataDestination.
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
        relations: {
          blogs: true,
          bookings: true,
          carts: true,
          categoriesfaqs: true,
          district: true,
          photodestinations: true,
          wishlists: true,
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
    const district = await this.districtsService.findOne(
      updateDestinationDto.districtId,
    );

    let dataDestination = new Destination();
    dataDestination.name = updateDestinationDto.name;
    dataDestination.priceAdult = updateDestinationDto.priceAdult;
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

    const result = await this.destinationsRepository.update(
      id,
      dataDestination,
    );

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
