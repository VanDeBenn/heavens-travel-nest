import { Test, TestingModule } from '@nestjs/testing';
import { PhotoDestinationsService } from './foto-destinations.service';

describe('FotoDestinationsService', () => {
  let service: PhotoDestinationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhotoDestinationsService],
    }).compile();

    service = module.get<PhotoDestinationsService>(PhotoDestinationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
