import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CategoriSomehelpfulFact } from './entities/categories-somehelpful-fact.entity';
import { CreateCategoriSomehelpfulFactDto } from './dto/create-categories-somehelpful-fact.dto';
import { UpdateCategoriSomehelpfulFactDto } from './dto/update-categories-somehelpful-fact.dto';
import { HotelsService } from '#/hotels/hotels.service';

@Injectable()
export class CategoriSomehelpfulFactService {
  constructor(
    @InjectRepository(CategoriSomehelpfulFact)
    private categorisomehelpfulfactsRepository: Repository<CategoriSomehelpfulFact>,
    private hotelService: HotelsService,
  ) {}

  // create new categorisomehelpfulfact
  async create(
    createCategoriSomehelpfulFactDto: CreateCategoriSomehelpfulFactDto,
  ) {
    const dataCategoriSomehelpfulFact = new CategoriSomehelpfulFact();
    dataCategoriSomehelpfulFact.title = createCategoriSomehelpfulFactDto.title;

    const result = await this.categorisomehelpfulfactsRepository.insert(
      dataCategoriSomehelpfulFact,
    );

    return this.categorisomehelpfulfactsRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.categorisomehelpfulfactsRepository.findAndCount({
      relations: {
        somehelpfulfacts: true,
        hotel: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.categorisomehelpfulfactsRepository.findOneOrFail({
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

  // update categorisomehelpfulfact
  async update(
    id: string,
    updateCategoriSomehelpfulFactDto: UpdateCategoriSomehelpfulFactDto,
  ) {
    let dataCategoriSomehelpfulFact = new CategoriSomehelpfulFact();
    dataCategoriSomehelpfulFact.title = updateCategoriSomehelpfulFactDto.title;

    try {
      await this.categorisomehelpfulfactsRepository.findOneOrFail({
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

    const result = await this.categorisomehelpfulfactsRepository.update(
      id,
      dataCategoriSomehelpfulFact,
    );

    return this.categorisomehelpfulfactsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete categorisomehelpfulfact
  async remove(id: string) {
    try {
      await this.categorisomehelpfulfactsRepository.findOneOrFail({
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

    await this.categorisomehelpfulfactsRepository.delete(id);
  }
}
