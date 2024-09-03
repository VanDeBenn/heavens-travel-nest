import { Test, TestingModule } from '@nestjs/testing';
import { ServiceAmenitiesService } from './service-amenities.service';

describe('ServiceAmenitiesService', () => {
  let service: ServiceAmenitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceAmenitiesService],
    }).compile();

    service = module.get<ServiceAmenitiesService>(ServiceAmenitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
