import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesSomehelpfulFactsService } from './categories-somehelpful-facts.service';

describe('CategoriesSomehelpfulFactsService', () => {
  let service: CategoriesSomehelpfulFactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesSomehelpfulFactsService],
    }).compile();

    service = module.get<CategoriesSomehelpfulFactsService>(CategoriesSomehelpfulFactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
