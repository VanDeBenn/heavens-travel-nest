import { Test, TestingModule } from '@nestjs/testing';
import { PropertyPolicyController } from './property-policies.controller';
import { PropertyPolicyService } from './property-policies.service';

describe('PropertyPoliciesController', () => {
  let controller: PropertyPolicyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyPolicyController],
      providers: [PropertyPolicyService],
    }).compile();

    controller = module.get<PropertyPolicyController>(PropertyPolicyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
