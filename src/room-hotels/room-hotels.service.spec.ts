import { Test, TestingModule } from '@nestjs/testing';
import { RoomHotelsService } from './room-hotels.service';

describe('RoomHotelsService', () => {
  let service: RoomHotelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomHotelsService],
    }).compile();

    service = module.get<RoomHotelsService>(RoomHotelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
