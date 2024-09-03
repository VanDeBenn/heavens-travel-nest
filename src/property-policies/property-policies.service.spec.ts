import { Test, TestingModule } from '@nestjs/testing';
import { PropertyPoliciesService } from './property-policies.service';

describe('PropertyPoliciesService', () => {
  let service: PropertyPoliciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertyPoliciesService],
    }).compile();

    service = module.get<PropertyPoliciesService>(PropertyPoliciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
