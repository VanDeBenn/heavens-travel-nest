import { Test, TestingModule } from '@nestjs/testing';
import { FotoReviewsController } from './foto-reviews.controller';
import { FotoReviewsService } from './foto-reviews.service';

describe('FotoReviewsController', () => {
  let controller: FotoReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FotoReviewsController],
      providers: [FotoReviewsService],
    }).compile();

    controller = module.get<FotoReviewsController>(FotoReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
