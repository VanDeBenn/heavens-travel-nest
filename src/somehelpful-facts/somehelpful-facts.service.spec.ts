import { Test, TestingModule } from '@nestjs/testing';
import { SomehelpfulFactsService } from './somehelpful-facts.service';

describe('SomehelpfulFactsService', () => {
  let service: SomehelpfulFactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SomehelpfulFactsService],
    }).compile();

    service = module.get<SomehelpfulFactsService>(SomehelpfulFactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
