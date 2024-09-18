import { Test, TestingModule } from '@nestjs/testing';
import { CitysController } from './cities.controller';
import { CitysService } from './cities.service';

describe('CitiesController', () => {
  let controller: CitysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitysController],
      providers: [CitysService],
    }).compile();

    controller = module.get<CitysController>(CitysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
