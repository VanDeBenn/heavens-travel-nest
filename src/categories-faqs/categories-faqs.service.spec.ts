import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesFaqsService } from './categories-faqs.service';

describe('CategoriesFaqsService', () => {
  let service: CategoriesFaqsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesFaqsService],
    }).compile();

    service = module.get<CategoriesFaqsService>(CategoriesFaqsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
