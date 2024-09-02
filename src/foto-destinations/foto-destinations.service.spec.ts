import { Test, TestingModule } from '@nestjs/testing';
import { FotoDestinationsService } from './foto-destinations.service';

describe('FotoDestinationsService', () => {
  let service: FotoDestinationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FotoDestinationsService],
    }).compile();

    service = module.get<FotoDestinationsService>(FotoDestinationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
