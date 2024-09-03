import { PartialType } from '@nestjs/swagger';
import { CreatePropertyPolicyDto } from './create-property-policy.dto';

export class UpdatePropertyPolicyDto extends PartialType(CreatePropertyPolicyDto) {}
