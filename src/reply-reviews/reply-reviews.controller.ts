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
import { ReplyReviewService } from './reply-reviews.service';
import { CreateReplyReviewDto } from './dto/create-reply-review.dto';
import { UpdateReplyReviewDto } from './dto/update-reply-review.dto';

@Controller('replyreviews')
export class ReplyReviewController {
  constructor(private readonly replyreviewsService: ReplyReviewService) {}

  @Post()
  async create(@Body() createReplyReviewDto: CreateReplyReviewDto) {
    return {
      data: await this.replyreviewsService.create(createReplyReviewDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  async findAll() {
    const [data, count] = await this.replyreviewsService.findAll();

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
      data: await this.replyreviewsService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateReplyReviewDto: UpdateReplyReviewDto,
  ) {
    return {
      data: await this.replyreviewsService.update(id, updateReplyReviewDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.replyreviewsService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}

//
