import { Test, TestingModule } from '@nestjs/testing';
import { PhotoReportsController } from './foto-reports.controller';
import { PhotoReportsService } from './foto-reports.service';

describe('FotoReportsController', () => {
  let controller: PhotoReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotoReportsController],
      providers: [PhotoReportsService],
    }).compile();

    controller = module.get<PhotoReportsController>(PhotoReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
