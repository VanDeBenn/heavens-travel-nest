import { Test, TestingModule } from '@nestjs/testing';
import { CountrysController } from './countries.controller';
import { CountrysService } from './countries.service';

describe('CountriesController', () => {
  let controller: CountrysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountrysController],
      providers: [CountrysService],
    }).compile();

    controller = module.get<CountrysController>(CountrysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
