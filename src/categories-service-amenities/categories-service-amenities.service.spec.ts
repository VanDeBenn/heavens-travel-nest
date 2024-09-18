import { Test, TestingModule } from '@nestjs/testing';
import { CategoriServiceAmenitysService } from './categories-service-amenities.service';

describe('CategoriesServiceAmenitiesService', () => {
  let service: CategoriServiceAmenitysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriServiceAmenitysService],
    }).compile();

    service = module.get<CategoriServiceAmenitysService>(CategoriServiceAmenitysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
