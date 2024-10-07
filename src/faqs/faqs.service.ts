import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { Faq } from './entities/faq.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CategoriesFaqsService } from '#/categories-faqs/categories-faqs.service';

@Injectable()
export class FaqsService {
  constructor(
    @InjectRepository(Faq)
    private faqsRepository: Repository<Faq>,
    private categoriesFaqService: CategoriesFaqsService,
  ) {}

  // create new faq
  async create(createFaqDto: CreateFaqDto) {
    const categoriesFaq = await this.categoriesFaqService.findOne(createFaqDto.categoriesFaqId);

    const dataFaq = new Faq();
    dataFaq.title = createFaqDto.title;
    dataFaq.categoriesfaq = categoriesFaq;

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
    const categoriesFaq = await this.categoriesFaqService.findOne(updateFaqDto.categoriesFaqId);

    let dataFaq = new Faq();
    dataFaq.title = updateFaqDto.title;
    dataFaq.categoriesfaq = categoriesFaq;

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
