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
import { SomehelpfulFactsService } from './somehelpful-facts.service';
import { CreateSomehelpfulFactDto } from './dto/create-somehelpful-fact.dto';
import { UpdateSomehelpfulFactDto } from './dto/update-somehelpful-fact.dto';

@Controller('somehelpfulFacts')
export class SomehelpfulFactsController {
  constructor(private readonly somehelpfulFactsService: SomehelpfulFactsService) {}

  @Post()
  async create(@Body() createSomehelpfulFactDto: CreateSomehelpfulFactDto) {
    return {
      data: await this.somehelpfulFactsService.create(createSomehelpfulFactDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  async findAll() {
    const [data, count] = await this.somehelpfulFactsService.findAll();

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
      data: await this.somehelpfulFactsService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSomehelpfulFactDto: UpdateSomehelpfulFactDto,
  ) {
    return {
      data: await this.somehelpfulFactsService.update(id, updateSomehelpfulFactDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.somehelpfulFactsService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}

//
