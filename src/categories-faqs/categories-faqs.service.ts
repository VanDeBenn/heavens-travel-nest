import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CategoriesFaq } from './entities/categories-faqs.entity';
import { CreateCategoriesFaqDto } from './dto/create-categories-faq.dto';
import { UpdateCategoriesFaqDto } from './dto/update-categories-faq.dto';
import { DestinationsService } from '#/destinations/destinations.service';
import { HotelsService } from '#/hotels/hotels.service';

@Injectable()
export class CategoriesFaqsService {
  constructor(
    @InjectRepository(CategoriesFaq)
    private categoriesfaqssRepository: Repository<CategoriesFaq>,
    private destinationService: DestinationsService,
    private hotelService: HotelsService,
  ) {}

  // create new categoriesfaqs
  async create(createCategoriesFaqDto: CreateCategoriesFaqDto) {
    const destination = await this.destinationService.findOne(createCategoriesFaqDto.detinationId);

    const hotel = await this.hotelService.findOne(createCategoriesFaqDto.hotelId);

    const dataCategoriesFaq = new CategoriesFaq();
    dataCategoriesFaq.title = createCategoriesFaqDto.title;
    dataCategoriesFaq.destination = destination;
    dataCategoriesFaq.hotel = hotel;

    const result = await this.categoriesfaqssRepository.insert(dataCategoriesFaq);

    return this.categoriesfaqssRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.categoriesfaqssRepository.findAndCount({
      relations: {
        faqs: true,
        hotel: true,
        destination: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.categoriesfaqssRepository.findOneOrFail({
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

  // update categoriesfaqs
  async update(id: string, updateCategoriesFaqDto: UpdateCategoriesFaqDto) {
    const destination = await this.destinationService.findOne(updateCategoriesFaqDto.detinationId);

    const hotel = await this.hotelService.findOne(updateCategoriesFaqDto.hotelId);

    let dataCategoriesFaq = new CategoriesFaq();
    dataCategoriesFaq.title = updateCategoriesFaqDto.title;
    dataCategoriesFaq.destination = destination;
    dataCategoriesFaq.hotel = hotel;


    try {
      await this.categoriesfaqssRepository.findOneOrFail({
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

    const result = await this.categoriesfaqssRepository.update(id, dataCategoriesFaq);

    return this.categoriesfaqssRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete categoriesfaqs
  async remove(id: string) {
    try {
      await this.categoriesfaqssRepository.findOneOrFail({
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

    await this.categoriesfaqssRepository.delete(id);
  }
}

