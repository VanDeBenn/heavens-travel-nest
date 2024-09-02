import { Test, TestingModule } from '@nestjs/testing';
import { FotoReportsController } from './foto-reports.controller';
import { FotoReportsService } from './foto-reports.service';

describe('FotoReportsController', () => {
  let controller: FotoReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FotoReportsController],
      providers: [FotoReportsService],
    }).compile();

    controller = module.get<FotoReportsController>(FotoReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
