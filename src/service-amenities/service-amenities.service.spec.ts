import { Test, TestingModule } from '@nestjs/testing';
import { ServiceAmenitysService } from './service-amenities.service';

describe('ServiceAmenitiesService', () => {
  let service: ServiceAmenitysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceAmenitysService],
    }).compile();

    service = module.get<ServiceAmenitysService>(ServiceAmenitysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
