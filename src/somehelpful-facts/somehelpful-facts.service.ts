import { Injectable } from '@nestjs/common';
import { CreateSomehelpfulFactDto } from './dto/create-somehelpful-fact.dto';
import { UpdateSomehelpfulFactDto } from './dto/update-somehelpful-fact.dto';

@Injectable()
export class SomehelpfulFactsService {
  create(createSomehelpfulFactDto: CreateSomehelpfulFactDto) {
    return 'This action adds a new somehelpfulFact';
  }

  findAll() {
    return `This action returns all somehelpfulFacts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} somehelpfulFact`;
  }

  update(id: number, updateSomehelpfulFactDto: UpdateSomehelpfulFactDto) {
    return `This action updates a #${id} somehelpfulFact`;
  }

  remove(id: number) {
    return `This action removes a #${id} somehelpfulFact`;
  }
}
