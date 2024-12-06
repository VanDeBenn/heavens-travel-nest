import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { PropertyPolicy } from './entities/property-policy.entity';
import { UpdatePropertyPolicyDto } from './dto/update-property-policy.dto';
import { CreatePropertyPolicyDto } from './dto/create-property-policy.dto';
import { HotelsService } from '#/hotels/hotels.service';

@Injectable()
export class PropertyPolicyService {
  constructor(
    @InjectRepository(PropertyPolicy)
    private propertypoliciesRepository: Repository<PropertyPolicy>,
    private hotelService: HotelsService,
  ) {}

  // create new propertypolicy
  async create(createPropertyPolicyDto: CreatePropertyPolicyDto) {
    const hotel = await this.hotelService.findOne(
      createPropertyPolicyDto.hotelId,
    );

    const dataPropertyPolicy = new PropertyPolicy();
    dataPropertyPolicy.title = createPropertyPolicyDto.title;
    dataPropertyPolicy.hotel = hotel;

    const result = await this.propertypoliciesRepository.insert(
      dataPropertyPolicy,
    );

    return this.propertypoliciesRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.propertypoliciesRepository.findAndCount({
      relations: {
        hotel: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.propertypoliciesRepository.findOneOrFail({
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

  // update propertypolicy
  async update(id: string, updatePropertyPolicyDto: UpdatePropertyPolicyDto) {
    const hotel = await this.hotelService.findOne(
      updatePropertyPolicyDto.hotelId,
    );

    let dataPropertyPolicy = new PropertyPolicy();
    dataPropertyPolicy.title = updatePropertyPolicyDto.title;
    dataPropertyPolicy.hotel = hotel;

    try {
      await this.propertypoliciesRepository.findOneOrFail({
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

    const result = await this.propertypoliciesRepository.update(
      id,
      dataPropertyPolicy,
    );

    return this.propertypoliciesRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete propertypolicy
  async remove(id: string) {
    try {
      await this.propertypoliciesRepository.findOneOrFail({
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

    await this.propertypoliciesRepository.delete(id);
  }
}
