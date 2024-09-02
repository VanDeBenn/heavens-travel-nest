import { Test, TestingModule } from '@nestjs/testing';
import { FotoReviewsService } from './foto-reviews.service';

describe('FotoReviewsService', () => {
  let service: FotoReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FotoReviewsService],
    }).compile();

    service = module.get<FotoReviewsService>(FotoReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
