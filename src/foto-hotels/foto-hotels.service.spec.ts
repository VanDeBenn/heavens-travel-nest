import { Test, TestingModule } from '@nestjs/testing';
import { FotoHotelsService } from './foto-hotels.service';

describe('FotoHotelsService', () => {
  let service: FotoHotelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FotoHotelsService],
    }).compile();

    service = module.get<FotoHotelsService>(FotoHotelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
