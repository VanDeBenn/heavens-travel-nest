import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesNearbyLocationsController } from './categories-nearby-location.controller';
import { CategoriesNearbyLocationsService } from './categories-nearby-location.service';

describe('CategoriesNearbyLocationController', () => {
  let controller: CategoriesNearbyLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesNearbyLocationsController],
      providers: [CategoriesNearbyLocationsService],
    }).compile();

    controller = module.get<CategoriesNearbyLocationsController>(CategoriesNearbyLocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
