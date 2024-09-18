import { Test, TestingModule } from '@nestjs/testing';
import { PhotoHotelsService } from './foto-hotels.service';

describe('FotoHotelsService', () => {
  let service: PhotoHotelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhotoHotelsService],
    }).compile();

    service = module.get<PhotoHotelsService>(PhotoHotelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
