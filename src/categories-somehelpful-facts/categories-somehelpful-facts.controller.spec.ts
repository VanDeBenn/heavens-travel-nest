import { Test, TestingModule } from '@nestjs/testing';
import { CategoriSomehelpfulFactController } from './categories-somehelpful-facts.controller';
import { CategoriSomehelpfulFactService } from './categories-somehelpful-facts.service';

describe('CategoriesSomehelpfulFactController', () => {
  let controller: CategoriSomehelpfulFactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriSomehelpfulFactController],
      providers: [CategoriSomehelpfulFactService],
    }).compile();

    controller = module.get<CategoriSomehelpfulFactController>(CategoriSomehelpfulFactController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
