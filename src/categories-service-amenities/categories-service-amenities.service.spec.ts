import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesServiceAmenitiesService } from './categories-service-amenities.service';

describe('CategoriesServiceAmenitiesService', () => {
  let service: CategoriesServiceAmenitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesServiceAmenitiesService],
    }).compile();

    service = module.get<CategoriesServiceAmenitiesService>(CategoriesServiceAmenitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
