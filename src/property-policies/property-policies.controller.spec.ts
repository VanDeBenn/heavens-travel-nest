import { Test, TestingModule } from '@nestjs/testing';
import { PropertyPoliciesController } from './property-policies.controller';
import { PropertyPoliciesService } from './property-policies.service';

describe('PropertyPoliciesController', () => {
  let controller: PropertyPoliciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyPoliciesController],
      providers: [PropertyPoliciesService],
    }).compile();

    controller = module.get<PropertyPoliciesController>(PropertyPoliciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
