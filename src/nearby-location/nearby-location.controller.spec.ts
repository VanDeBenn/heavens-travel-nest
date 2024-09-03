import { Test, TestingModule } from '@nestjs/testing';
import { NearbyLocationController } from './nearby-location.controller';
import { NearbyLocationService } from './nearby-location.service';

describe('NearbyLocationController', () => {
  let controller: NearbyLocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NearbyLocationController],
      providers: [NearbyLocationService],
    }).compile();

    controller = module.get<NearbyLocationController>(NearbyLocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
