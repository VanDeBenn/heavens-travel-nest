import { Test, TestingModule } from '@nestjs/testing';
import { PhotoReportsService } from './foto-reports.service';

describe('FotoReportsService', () => {
  let service: PhotoReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhotoReportsService],
    }).compile();

    service = module.get<PhotoReportsService>(PhotoReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
