import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Hotel } from './entities/hotel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CitysService } from '#/cities/cities.service';
import { City } from '#/cities/entities/city.entity';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel)
    private hotelsRepository: Repository<Hotel>,
    @InjectRepository(City)
    private citiesRepository: Repository<City>,
    private citysService: CitysService,
  ) {}

  // create new hotel
  async create(createHotelDto: CreateHotelDto) {
    const city = await this.citiesRepository.findOne({
      where: {
        name: createHotelDto.cityName,
        province: { name: createHotelDto.provinceName },
        // country: { name: dto.countryName },
      },
    });

    if (!city) {
      throw new Error('City not found');
    }

    const dataHotel = new Hotel();
    dataHotel.name = createHotelDto.name;
    dataHotel.rating = createHotelDto.rating;
    dataHotel.description = createHotelDto.description;
    dataHotel.address = createHotelDto.address;
    dataHotel.pathLocation = createHotelDto.pathLocation;
    dataHotel.city = city;

    const result = await this.hotelsRepository.insert(dataHotel);

    return this.hotelsRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.hotelsRepository.findAndCount({
      relations: {
        wishlists: true,
        blogs: true,
        categorisomehelpfulfacts: true,
        categoriesnearbylocations: true,
        categoriesfaqs: true,
        photohotels: true,
        categoriserviceamenities: true,
        roomhotels: true,
        propertypolicies: true,
        city: { province: { country: true } },
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.hotelsRepository.findOneOrFail({
        where: {
          id,
        },
        relations: {
          city: { province: { country: true } },
          facility: { serviceAmenities: true },
          nearbyLocation: { categoriesnearbylocation: true },
          photohotels: true,
          propertypolicies: true,
          roomhotels: { photoroomhotels: true },
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

  async findByCityName(dto: { cityName: string }) {
    try {
      console.log(`City name received: ${dto.cityName}`);

      const city = await this.citiesRepository
        .createQueryBuilder('city')
        .where('LOWER(city.name) = LOWER(:name)', { name: dto.cityName })
        .getOne();

      if (!city) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'City not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const cityId = city?.id;

      return await this.hotelsRepository.find({
        where: { city: { id: cityId } },
        relations: { city: true },
      });
    } catch (e) {
      throw e;
    }
  }

  // update hotel
  async update(id: string, updateHotelDto: UpdateHotelDto) {
    let dataHotel = new Hotel();
    dataHotel.name = updateHotelDto.name;
    dataHotel.rating = updateHotelDto.rating;
    dataHotel.description = updateHotelDto.description;
    dataHotel.address = updateHotelDto.address;
    dataHotel.pathLocation = updateHotelDto.pathLocation;

    try {
      await this.hotelsRepository.findOneOrFail({
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

    const result = await this.hotelsRepository.update(id, dataHotel);

    return this.hotelsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete hotel
  async remove(id: string) {
    try {
      await this.hotelsRepository.findOneOrFail({
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

    await this.hotelsRepository.delete(id);
  }
}
