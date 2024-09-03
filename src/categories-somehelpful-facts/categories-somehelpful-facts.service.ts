import { Injectable } from '@nestjs/common';
import { CreateCategoriesSomehelpfulFactDto } from './dto/create-categories-somehelpful-fact.dto';
import { UpdateCategoriesSomehelpfulFactDto } from './dto/update-categories-somehelpful-fact.dto';

@Injectable()
export class CategoriesSomehelpfulFactsService {
  create(createCategoriesSomehelpfulFactDto: CreateCategoriesSomehelpfulFactDto) {
    return 'This action adds a new categoriesSomehelpfulFact';
  }

  findAll() {
    return `This action returns all categoriesSomehelpfulFacts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoriesSomehelpfulFact`;
  }

  update(id: number, updateCategoriesSomehelpfulFactDto: UpdateCategoriesSomehelpfulFactDto) {
    return `This action updates a #${id} categoriesSomehelpfulFact`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoriesSomehelpfulFact`;
  }
}
