import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyPoliciesService } from './property-policies.service';
import { CreatePropertyPolicyDto } from './dto/create-property-policy.dto';
import { UpdatePropertyPolicyDto } from './dto/update-property-policy.dto';

@Controller('property-policies')
export class PropertyPoliciesController {
  constructor(private readonly propertyPoliciesService: PropertyPoliciesService) {}

  @Post()
  create(@Body() createPropertyPolicyDto: CreatePropertyPolicyDto) {
    return this.propertyPoliciesService.create(createPropertyPolicyDto);
  }

  @Get()
  findAll() {
    return this.propertyPoliciesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyPoliciesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyPolicyDto: UpdatePropertyPolicyDto) {
    return this.propertyPoliciesService.update(+id, updatePropertyPolicyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyPoliciesService.remove(+id);
  }
}
