import { Test, TestingModule } from '@nestjs/testing';
import { PhotoReviewsController } from './foto-reviews.controller';
import { PhotoReviewsService } from './foto-reviews.service';

describe('FotoReviewsController', () => {
  let controller: PhotoReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotoReviewsController],
      providers: [PhotoReviewsService],
    }).compile();

    controller = module.get<PhotoReviewsController>(PhotoReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
