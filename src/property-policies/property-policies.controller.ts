import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { PropertyPolicyService } from './property-policies.service';
import { CreatePropertyPolicyDto } from './dto/create-property-policy.dto';
import { UpdatePropertyPolicyDto } from './dto/update-property-policy.dto';

@Controller('property-policies')
export class PropertyPolicyController {
  constructor(
    private readonly propertypoliciesService: PropertyPolicyService,
  ) {}

  @Post()
  async create(@Body() createPropertyPolicyDto: CreatePropertyPolicyDto) {
    return {
      data: await this.propertypoliciesService.create(createPropertyPolicyDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  async findAll() {
    const [data, count] = await this.propertypoliciesService.findAll();

    return {
      data,
      count,
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return {
      data: await this.propertypoliciesService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePropertyPolicyDto: UpdatePropertyPolicyDto,
  ) {
    return {
      data: await this.propertypoliciesService.update(
        id,
        updatePropertyPolicyDto,
      ),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.propertypoliciesService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}

//
