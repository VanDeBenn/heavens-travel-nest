import { Test, TestingModule } from '@nestjs/testing';
import { ReplyReviewsService } from './reply-reviews.service';

describe('ReplyReviewsService', () => {
  let service: ReplyReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReplyReviewsService],
    }).compile();

    service = module.get<ReplyReviewsService>(ReplyReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
