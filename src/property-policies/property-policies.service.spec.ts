import { Test, TestingModule } from '@nestjs/testing';
import { PropertyPolicyService } from './property-policies.service';

describe('PropertyPoliciesService', () => {
  let service: PropertyPolicyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertyPolicyService],
    }).compile();

    service = module.get<PropertyPolicyService>(PropertyPolicyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
