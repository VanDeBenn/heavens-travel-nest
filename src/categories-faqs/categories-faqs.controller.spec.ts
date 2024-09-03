import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesFaqsController } from './categories-faqs.controller';
import { CategoriesFaqsService } from './categories-faqs.service';

describe('CategoriesFaqsController', () => {
  let controller: CategoriesFaqsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesFaqsController],
      providers: [CategoriesFaqsService],
    }).compile();

    controller = module.get<CategoriesFaqsController>(CategoriesFaqsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
