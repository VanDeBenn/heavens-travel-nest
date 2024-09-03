import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesNearbyLocationService } from './categories-nearby-location.service';

describe('CategoriesNearbyLocationService', () => {
  let service: CategoriesNearbyLocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesNearbyLocationService],
    }).compile();

    service = module.get<CategoriesNearbyLocationService>(CategoriesNearbyLocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
