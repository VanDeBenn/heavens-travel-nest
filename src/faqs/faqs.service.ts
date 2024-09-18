import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { Faq } from './entities/faq.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class FaqsService {
  constructor(
    @InjectRepository(Faq)
    private faqsRepository: Repository<Faq>,
  ) {}

  // create new faq
  async create(createFaqDto: CreateFaqDto) {
    const dataFaq = new Faq();

    const result = await this.faqsRepository.insert(dataFaq);

    return this.faqsRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.faqsRepository.findAndCount({
      relations: {
        categoriesfaq: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.faqsRepository.findOneOrFail({
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

  // update faq
  async update(id: string, updateFaqDto: UpdateFaqDto) {
    let dataFaq = new Faq();

    try {
      await this.faqsRepository.findOneOrFail({
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

    const result = await this.faqsRepository.update(id, dataFaq);

    return this.faqsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete faq
  async remove(id: string) {
    try {
      await this.faqsRepository.findOneOrFail({
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

    await this.faqsRepository.delete(id);
  }
}
