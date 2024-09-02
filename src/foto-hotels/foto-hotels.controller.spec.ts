import { Test, TestingModule } from '@nestjs/testing';
import { FotoHotelsController } from './foto-hotels.controller';
import { FotoHotelsService } from './foto-hotels.service';

describe('FotoHotelsController', () => {
  let controller: FotoHotelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FotoHotelsController],
      providers: [FotoHotelsService],
    }).compile();

    controller = module.get<FotoHotelsController>(FotoHotelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
