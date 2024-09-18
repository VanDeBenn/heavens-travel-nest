import { Test, TestingModule } from '@nestjs/testing';
import { CategoriServiceAmenitysController } from './categories-service-amenities.controller';
import { CategoriServiceAmenitysService } from './categories-service-amenities.service';

describe('CategoriesServiceAmenitiesController', () => {
  let controller: CategoriServiceAmenitysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriServiceAmenitysController],
      providers: [CategoriServiceAmenitysService],
    }).compile();

    controller = module.get<CategoriServiceAmenitysController>(CategoriServiceAmenitysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
