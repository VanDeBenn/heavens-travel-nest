import { Test, TestingModule } from '@nestjs/testing';
import { ProvinceController } from './provinces.controller';
import { ProvinceService } from './provinces.service';

describe('ProvincesController', () => {
  let controller: ProvinceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvinceController],
      providers: [ProvinceService],
    }).compile();

    controller = module.get<ProvinceController>(ProvinceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
