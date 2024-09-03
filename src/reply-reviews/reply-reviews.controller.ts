import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReplyReviewsService } from './reply-reviews.service';
import { CreateReplyReviewDto } from './dto/create-reply-review.dto';
import { UpdateReplyReviewDto } from './dto/update-reply-review.dto';

@Controller('reply-reviews')
export class ReplyReviewsController {
  constructor(private readonly replyReviewsService: ReplyReviewsService) {}

  @Post()
  create(@Body() createReplyReviewDto: CreateReplyReviewDto) {
    return this.replyReviewsService.create(createReplyReviewDto);
  }

  @Get()
  findAll() {
    return this.replyReviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.replyReviewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReplyReviewDto: UpdateReplyReviewDto) {
    return this.replyReviewsService.update(+id, updateReplyReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.replyReviewsService.remove(+id);
  }
}
