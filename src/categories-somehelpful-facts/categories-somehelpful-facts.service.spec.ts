import { Test, TestingModule } from '@nestjs/testing';
import { CategoriSomehelpfulFactService } from './categories-somehelpful-facts.service';

describe('CategoriesSomehelpfulFactsService', () => {
  let service: CategoriSomehelpfulFactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriSomehelpfulFactService],
    }).compile();

    service = module.get<CategoriSomehelpfulFactService>(CategoriSomehelpfulFactService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
