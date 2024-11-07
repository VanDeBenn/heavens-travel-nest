import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { UsersService } from '#/users/users.service';
import { BookingDetailsService } from '#/booking-detail/booking-detail.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
    private userService: UsersService,
    private bookingDetailService: BookingDetailsService,
  ) {}

  // create new review
  async create(createReviewDto: CreateReviewDto) {
    const user = await this.userService.findOne(createReviewDto.userId);
    const bookingDetail = await this.bookingDetailService.findOne(
      createReviewDto.bookingDetailId,
    );

    const dataReview = new Review();
    dataReview.rating = createReviewDto.rating;
    dataReview.comment = createReviewDto.comment;
    dataReview.user = user;
    dataReview.bookingdetail = bookingDetail;

    const result = await this.reviewsRepository.insert(dataReview);

    return this.reviewsRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.reviewsRepository.findAndCount({
      relations: {
        bookingdetail: true,
        replyreviews: true,
        photoreviews: true,
        user: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.reviewsRepository.findOneOrFail({
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

  // update review
  async update(id: string, updateReviewDto: UpdateReviewDto) {
    const user = await this.userService.findOne(updateReviewDto.userId);

    let dataReview = new Review();
    dataReview.rating = updateReviewDto.rating;
    dataReview.comment = updateReviewDto.comment;
    dataReview.user = user;

    try {
      await this.reviewsRepository.findOneOrFail({
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

    const result = await this.reviewsRepository.update(id, dataReview);

    return this.reviewsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete review
  async remove(id: string) {
    try {
      await this.reviewsRepository.findOneOrFail({
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

    await this.reviewsRepository.delete(id);
  }
}
