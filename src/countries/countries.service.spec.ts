import { Test, TestingModule } from '@nestjs/testing';
import { CountrysService } from './countries.service';

describe('CountriesService', () => {
  let service: CountrysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountrysService],
    }).compile();

    service = module.get<CountrysService>(CountrysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
