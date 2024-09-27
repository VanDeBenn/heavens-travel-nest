import { Test, TestingModule } from '@nestjs/testing';
import { RoomTypeService } from './room-type.service';
import { RoomTypeController } from './room-type.controller';

describe('RoomTypeController', () => {
  let controller: RoomTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomTypeController],
      providers: [RoomTypeService],
    }).compile();

    controller = module.get<RoomTypeController>(RoomTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
