import { Test, TestingModule } from '@nestjs/testing';
import { FotoRoomHotelsService } from './foto-room-hotels.service';

describe('FotoRoomHotelsService', () => {
  let service: FotoRoomHotelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FotoRoomHotelsService],
    }).compile();

    service = module.get<FotoRoomHotelsService>(FotoRoomHotelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
