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


@Controller('propertypolicys')
export class PropertyPolicyController {
  constructor(private readonly propertypolicysService: PropertyPolicyService) {}

  @Post()
  async create(@Body() createPropertyPolicyDto: CreatePropertyPolicyDto) {
    return {
      data: await this.propertypolicysService.create(createPropertyPolicyDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  async findAll() {
    const [data, count] = await this.propertypolicysService.findAll();

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
      data: await this.propertypolicysService.findOne(id),
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
      data: await this.propertypolicysService.update(id, updatePropertyPolicyDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.propertypolicysService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}

//
