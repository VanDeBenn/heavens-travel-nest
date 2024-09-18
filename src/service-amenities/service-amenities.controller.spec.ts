import { Test, TestingModule } from '@nestjs/testing';
import { ServiceAmenitysController } from './service-amenities.controller';
import { ServiceAmenitysService } from './service-amenities.service';

describe('ServiceAmenitiesController', () => {
  let controller: ServiceAmenitysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceAmenitysController],
      providers: [ServiceAmenitysService],
    }).compile();

    controller = module.get<ServiceAmenitysController>(ServiceAmenitysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
