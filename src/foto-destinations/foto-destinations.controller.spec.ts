import { Test, TestingModule } from '@nestjs/testing';
import { FotoDestinationsController } from './foto-destinations.controller';
import { FotoDestinationsService } from './foto-destinations.service';

describe('FotoDestinationsController', () => {
  let controller: FotoDestinationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FotoDestinationsController],
      providers: [FotoDestinationsService],
    }).compile();

    controller = module.get<FotoDestinationsController>(FotoDestinationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
