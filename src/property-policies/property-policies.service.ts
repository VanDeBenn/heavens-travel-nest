import { Injectable } from '@nestjs/common';
import { CreatePropertyPolicyDto } from './dto/create-property-policy.dto';
import { UpdatePropertyPolicyDto } from './dto/update-property-policy.dto';

@Injectable()
export class PropertyPoliciesService {
  create(createPropertyPolicyDto: CreatePropertyPolicyDto) {
    return 'This action adds a new propertyPolicy';
  }

  findAll() {
    return `This action returns all propertyPolicies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} propertyPolicy`;
  }

  update(id: number, updatePropertyPolicyDto: UpdatePropertyPolicyDto) {
    return `This action updates a #${id} propertyPolicy`;
  }

  remove(id: number) {
    return `This action removes a #${id} propertyPolicy`;
  }
}
