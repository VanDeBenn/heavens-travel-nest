import { Test, TestingModule } from '@nestjs/testing';
import { ServiceAmenitiesController } from './service-amenities.controller';
import { ServiceAmenitiesService } from './service-amenities.service';

describe('ServiceAmenitiesController', () => {
  let controller: ServiceAmenitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceAmenitiesController],
      providers: [ServiceAmenitiesService],
    }).compile();

    controller = module.get<ServiceAmenitiesController>(ServiceAmenitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
