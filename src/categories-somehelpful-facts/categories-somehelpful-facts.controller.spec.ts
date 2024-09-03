import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesSomehelpfulFactsController } from './categories-somehelpful-facts.controller';
import { CategoriesSomehelpfulFactsService } from './categories-somehelpful-facts.service';

describe('CategoriesSomehelpfulFactsController', () => {
  let controller: CategoriesSomehelpfulFactsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesSomehelpfulFactsController],
      providers: [CategoriesSomehelpfulFactsService],
    }).compile();

    controller = module.get<CategoriesSomehelpfulFactsController>(CategoriesSomehelpfulFactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
