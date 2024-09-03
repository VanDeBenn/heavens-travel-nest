import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesNearbyLocationController } from './categories-nearby-location.controller';
import { CategoriesNearbyLocationService } from './categories-nearby-location.service';

describe('CategoriesNearbyLocationController', () => {
  let controller: CategoriesNearbyLocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesNearbyLocationController],
      providers: [CategoriesNearbyLocationService],
    }).compile();

    controller = module.get<CategoriesNearbyLocationController>(CategoriesNearbyLocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
