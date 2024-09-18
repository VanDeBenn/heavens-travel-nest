import { Test, TestingModule } from '@nestjs/testing';
import { ReplyReviewService } from './reply-reviews.service';

describe('ReplyReviewsService', () => {
  let service: ReplyReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReplyReviewService],
    }).compile();

    service = module.get<ReplyReviewService>(ReplyReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
