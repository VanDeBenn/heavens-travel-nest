import { Injectable } from '@nestjs/common';
import { CreateCategoriesFaqDto } from './dto/create-categories-faq.dto';
import { UpdateCategoriesFaqDto } from './dto/update-categories-faq.dto';

@Injectable()
export class CategoriesFaqsService {
  create(createCategoriesFaqDto: CreateCategoriesFaqDto) {
    return 'This action adds a new categoriesFaq';
  }

  findAll() {
    return `This action returns all categoriesFaqs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoriesFaq`;
  }

  update(id: number, updateCategoriesFaqDto: UpdateCategoriesFaqDto) {
    return `This action updates a #${id} categoriesFaq`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoriesFaq`;
  }
}
