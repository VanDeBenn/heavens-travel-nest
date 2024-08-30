import { Test, TestingModule } from '@nestjs/testing';
import { RoomHotelsController } from './room-hotels.controller';
import { RoomHotelsService } from './room-hotels.service';

describe('RoomHotelsController', () => {
  let controller: RoomHotelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomHotelsController],
      providers: [RoomHotelsService],
    }).compile();

    controller = module.get<RoomHotelsController>(RoomHotelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
