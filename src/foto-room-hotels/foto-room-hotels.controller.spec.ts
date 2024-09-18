import { Test, TestingModule } from '@nestjs/testing';
import { PhotoRoomHotelsController } from './foto-room-hotels.controller';
import { PhotoRoomHotelsService } from './foto-room-hotels.service';

describe('FotoRoomHotelsController', () => {
  let controller: PhotoRoomHotelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotoRoomHotelsController],
      providers: [PhotoRoomHotelsService],
    }).compile();

    controller = module.get<PhotoRoomHotelsController>(PhotoRoomHotelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
