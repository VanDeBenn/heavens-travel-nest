import { Test, TestingModule } from '@nestjs/testing';
import { FotoRoomHotelsController } from './foto-room-hotels.controller';
import { FotoRoomHotelsService } from './foto-room-hotels.service';

describe('FotoRoomHotelsController', () => {
  let controller: FotoRoomHotelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FotoRoomHotelsController],
      providers: [FotoRoomHotelsService],
    }).compile();

    controller = module.get<FotoRoomHotelsController>(FotoRoomHotelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
