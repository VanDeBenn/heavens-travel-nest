import { Test, TestingModule } from '@nestjs/testing';
import { PhotoDestinationsController } from './foto-destinations.controller';
import { PhotoDestinationsService } from './foto-destinations.service';

describe('FotoDestinationsController', () => {
  let controller: PhotoDestinationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotoDestinationsController],
      providers: [PhotoDestinationsService],
    }).compile();

    controller = module.get<PhotoDestinationsController>(PhotoDestinationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
