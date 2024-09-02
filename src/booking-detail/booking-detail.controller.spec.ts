import { Test, TestingModule } from '@nestjs/testing';
import { BookingDetailController } from './booking-detail.controller';
import { BookingDetailService } from './booking-detail.service';

describe('BookingDetailController', () => {
  let controller: BookingDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingDetailController],
      providers: [BookingDetailService],
    }).compile();

    controller = module.get<BookingDetailController>(BookingDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
