import { Test, TestingModule } from '@nestjs/testing';
import { PhotoHotelsController } from './foto-hotels.controller';
import { PhotoHotelsService } from './foto-hotels.service';

describe('FotoHotelsController', () => {
  let controller: PhotoHotelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotoHotelsController],
      providers: [PhotoHotelsService],
    }).compile();

    controller = module.get<PhotoHotelsController>(PhotoHotelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
