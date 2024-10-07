import { Module } from '@nestjs/common';
import { PropertyPolicyService } from './property-policies.service';
import { PropertyPolicyController } from './property-policies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyPolicy } from './entities/property-policy.entity';
import { HotelsModule } from '#/hotels/hotels.module';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyPolicy]), HotelsModule],
  controllers: [PropertyPolicyController],
  providers: [PropertyPolicyService],
  exports: [PropertyPolicyService],
})
export class PropertyPoliciesModule {}
