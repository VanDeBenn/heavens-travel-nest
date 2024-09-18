import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { ReplyReview } from './entities/reply-review.entity';
import { CreateReplyReviewDto } from './dto/create-reply-review.dto';
import { UpdateReplyReviewDto } from './dto/update-reply-review.dto';

@Injectable()
export class ReplyReviewService {
  constructor(
    @InjectRepository(ReplyReview)
    private replyreviewsRepository: Repository<ReplyReview>,
  ) {}

  // create new replyreview
  async create(createReplyReviewDto: CreateReplyReviewDto) {
    const dataReplyReview = new ReplyReview();


    const result = await this.replyreviewsRepository.insert(dataReplyReview);

    return this.replyreviewsRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.replyreviewsRepository.findAndCount({
      relations: {
        review: true,
        user: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.replyreviewsRepository.findOneOrFail({
        where: {
          id,
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }
  }

  // update replyreview
  async update(id: string, updateReplyReviewDto: UpdateReplyReviewDto) {
    let dataReplyReview = new ReplyReview();

    try {
      await this.replyreviewsRepository.findOneOrFail({
        where: {
          id,
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }

    const result = await this.replyreviewsRepository.update(id,dataReplyReview);

    return this.replyreviewsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete replyreview
  async remove(id: string) {
    try {
      await this.replyreviewsRepository.findOneOrFail({
        where: {
          id,
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }

    await this.replyreviewsRepository.delete(id);
  }
}
