import { Test, TestingModule } from '@nestjs/testing';
import { FotoReportsService } from './foto-reports.service';

describe('FotoReportsService', () => {
  let service: FotoReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FotoReportsService],
    }).compile();

    service = module.get<FotoReportsService>(FotoReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
