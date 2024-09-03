import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesServiceAmenitiesController } from './categories-service-amenities.controller';
import { CategoriesServiceAmenitiesService } from './categories-service-amenities.service';

describe('CategoriesServiceAmenitiesController', () => {
  let controller: CategoriesServiceAmenitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesServiceAmenitiesController],
      providers: [CategoriesServiceAmenitiesService],
    }).compile();

    controller = module.get<CategoriesServiceAmenitiesController>(CategoriesServiceAmenitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
