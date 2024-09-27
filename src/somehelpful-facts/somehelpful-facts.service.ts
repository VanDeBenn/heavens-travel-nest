import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { SomehelpfulFact } from './entities/somehelpful-fact.entity';
import { CreateSomehelpfulFactDto } from './dto/create-somehelpful-fact.dto';
import { UpdateSomehelpfulFactDto } from './dto/update-somehelpful-fact.dto';

@Injectable()
export class SomehelpfulFactsService {
  categoriSomehelpfulFactService: any;
  constructor(
    @InjectRepository(SomehelpfulFact)
    private somehelpfulFactsRepository: Repository<SomehelpfulFact>,
  ) {}

  // create new somehelpfulFact
  async create(createSomehelpfulFactDto: CreateSomehelpfulFactDto) {
    const categoriSomehelpfulFact = await this.categoriSomehelpfulFactService.findOne(createSomehelpfulFactDto.categoriSomehelpfulFact);

    const dataSomehelpfulFact = new SomehelpfulFact();
    dataSomehelpfulFact.title = createSomehelpfulFactDto.title;
    dataSomehelpfulFact.categorisomehelpfulfact = categoriSomehelpfulFact;

    const result = await this.somehelpfulFactsRepository.insert(dataSomehelpfulFact);
    return this.somehelpfulFactsRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.somehelpfulFactsRepository.findAndCount({
      relations: {
        categorisomehelpfulfact: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.somehelpfulFactsRepository.findOneOrFail({
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

  // update somehelpfulFact
  async update(id: string, updateSomehelpfulFactDto: UpdateSomehelpfulFactDto) {
    const categoriSomehelpfulFact = await this.categoriSomehelpfulFactService.findOne(updateSomehelpfulFactDto.categoriSomehelpfulFact);

    let dataSomehelpfulFact = new SomehelpfulFact();
    dataSomehelpfulFact.title = updateSomehelpfulFactDto.title;
    dataSomehelpfulFact.categorisomehelpfulfact = categoriSomehelpfulFact;

    try {
      await this.somehelpfulFactsRepository.findOneOrFail({
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

    const result = await this.somehelpfulFactsRepository.update(id, updateSomehelpfulFactDto);

    return this.somehelpfulFactsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete somehelpfulFact
  async remove(id: string) {
    try {
      await this.somehelpfulFactsRepository.findOneOrFail({
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

    await this.somehelpfulFactsRepository.delete(id);
  }
}
