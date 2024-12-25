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
import { CategoriSomehelpfulFactService } from './categories-somehelpful-facts.service';
import { CreateCategoriSomehelpfulFactDto } from './dto/create-categories-somehelpful-fact.dto';
import { UpdateCategoriSomehelpfulFactDto } from './dto/update-categories-somehelpful-fact.dto';

@Controller('categori-somehelpful-facts')
export class CategoriSomehelpfulFactController {
  constructor(
    private readonly categorisomehelpfulfactsService: CategoriSomehelpfulFactService,
  ) {}

  @Post()
  async create(
    @Body() createCategoriSomehelpfulFactDto: CreateCategoriSomehelpfulFactDto,
  ) {
    return {
      data: await this.categorisomehelpfulfactsService.create(
        createCategoriSomehelpfulFactDto,
      ),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  async findAll() {
    const [data, count] = await this.categorisomehelpfulfactsService.findAll();

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
      data: await this.categorisomehelpfulfactsService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoriSomehelpfulFactDto: UpdateCategoriSomehelpfulFactDto,
  ) {
    return {
      data: await this.categorisomehelpfulfactsService.update(
        id,
        updateCategoriSomehelpfulFactDto,
      ),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.categorisomehelpfulfactsService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}

//
