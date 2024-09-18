import { Test, TestingModule } from '@nestjs/testing';
import { PhotoReviewsService } from './foto-reviews.service';

describe('FotoReviewsService', () => {
  let service: PhotoReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhotoReviewsService],
    }).compile();

    service = module.get<PhotoReviewsService>(PhotoReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
