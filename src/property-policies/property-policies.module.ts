import { Module } from '@nestjs/common';
import { PropertyPoliciesService } from './property-policies.service';
import { PropertyPoliciesController } from './property-policies.controller';

@Module({
  controllers: [PropertyPoliciesController],
  providers: [PropertyPoliciesService]
})
export class PropertyPoliciesModule {}
