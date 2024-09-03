import { Test, TestingModule } from '@nestjs/testing';
import { NearbyLocationService } from './nearby-location.service';

describe('NearbyLocationService', () => {
  let service: NearbyLocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NearbyLocationService],
    }).compile();

    service = module.get<NearbyLocationService>(NearbyLocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
