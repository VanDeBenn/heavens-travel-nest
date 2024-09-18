import { Test, TestingModule } from '@nestjs/testing';
import { PhotoRoomHotelsService } from './foto-room-hotels.service';

describe('FotoRoomHotelsService', () => {
  let service: PhotoRoomHotelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhotoRoomHotelsService],
    }).compile();

    service = module.get<PhotoRoomHotelsService>(PhotoRoomHotelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
