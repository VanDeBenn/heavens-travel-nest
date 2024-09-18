import { Test, TestingModule } from '@nestjs/testing';
import { ReplyReviewController } from './reply-reviews.controller';
import { ReplyReviewService } from './reply-reviews.service';

describe('ReplyReviewsController', () => {
  let controller: ReplyReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReplyReviewController],
      providers: [ReplyReviewService],
    }).compile();

    controller = module.get<ReplyReviewController>(ReplyReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
