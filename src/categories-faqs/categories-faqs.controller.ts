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
import { CategoriesFaqsService } from './categories-faqs.service';
import { CreateCategoriesFaqDto } from './dto/create-categories-faq.dto';
import { UpdateCategoriesFaqDto } from './dto/update-categories-faq.dto';

@Controller('categoriesfaqss')
export class CategoriesFaqsController {
  constructor(private readonly categoriesfaqssService: CategoriesFaqsService) {}

  @Post()
  async create(@Body() createCategoriesFaqDto: CreateCategoriesFaqDto) {
    return {
      data: await this.categoriesfaqssService.create(createCategoriesFaqDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  async findAll() {
    const [data, count] = await this.categoriesfaqssService.findAll();

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
      data: await this.categoriesfaqssService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoriesFaqDto: UpdateCategoriesFaqDto,
  ) {
    return {
      data: await this.categoriesfaqssService.update(id, updateCategoriesFaqDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.categoriesfaqssService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}

//
