import { Test, TestingModule } from '@nestjs/testing';
import { BookingDetailsController } from './booking-detail.controller';
import { BookingDetailsService } from './booking-detail.service';

describe('BookingDetailController', () => {
  let controller: BookingDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingDetailsController],
      providers: [BookingDetailsService],
    }).compile();

    controller = module.get<BookingDetailsController>(BookingDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
