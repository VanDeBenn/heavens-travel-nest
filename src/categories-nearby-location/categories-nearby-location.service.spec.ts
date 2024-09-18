import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesNearbyLocationsService } from './categories-nearby-location.service';

describe('CategoriesNearbyLocationService', () => {
  let service: CategoriesNearbyLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesNearbyLocationsService],
    }).compile();

    service = module.get<CategoriesNearbyLocationsService>(CategoriesNearbyLocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
