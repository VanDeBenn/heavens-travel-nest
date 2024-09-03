import { Test, TestingModule } from '@nestjs/testing';
import { ReplyReviewsController } from './reply-reviews.controller';
import { ReplyReviewsService } from './reply-reviews.service';

describe('ReplyReviewsController', () => {
  let controller: ReplyReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReplyReviewsController],
      providers: [ReplyReviewsService],
    }).compile();

    controller = module.get<ReplyReviewsController>(ReplyReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
