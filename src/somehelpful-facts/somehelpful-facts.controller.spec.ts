import { Test, TestingModule } from '@nestjs/testing';
import { SomehelpfulFactsController } from './somehelpful-facts.controller';
import { SomehelpfulFactsService } from './somehelpful-facts.service';

describe('SomehelpfulFactsController', () => {
  let controller: SomehelpfulFactsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SomehelpfulFactsController],
      providers: [SomehelpfulFactsService],
    }).compile();

    controller = module.get<SomehelpfulFactsController>(SomehelpfulFactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
