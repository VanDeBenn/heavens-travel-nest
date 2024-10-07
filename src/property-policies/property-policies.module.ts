import { Module } from '@nestjs/common';
import { PropertyPolicyService } from './property-policies.service';
import { PropertyPolicyController } from './property-policies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyPolicy } from './entities/property-policy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyPolicy])],
  controllers: [PropertyPolicyController],
  providers: [PropertyPolicyService],
  exports: [PropertyPolicyService],
})
export class PropertyPoliciesModule {}
