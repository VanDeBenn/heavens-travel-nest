import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { PhotoReview } from './entities/foto-review.entity';
import { CreatePhotoReviewDto } from './dto/create-foto-review.dto';
import { UpdatePhotoReviewDto } from './dto/update-foto-review.dto';

@Injectable()
export class PhotoReviewsService {
  reviewService: any;
  constructor(
    @InjectRepository(PhotoReview)
    private photoreviewsRepository: Repository<PhotoReview>,
  ) {}

  // create new photoreview
  async create(createPhotoReviewDto: CreatePhotoReviewDto) {
    const review = await this.reviewService.findOne(createPhotoReviewDto.reviewId);

    const dataPhotoReview = new PhotoReview();
    dataPhotoReview.pathPhoto = createPhotoReviewDto.pathPhoto;
    dataPhotoReview.review = review;

    const result = await this.photoreviewsRepository.insert(dataPhotoReview);

    return this.photoreviewsRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.photoreviewsRepository.findAndCount({
      relations: {
        review: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.photoreviewsRepository.findOneOrFail({
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

  // update photoreview
  async update(id: string, updatePhotoReviewDto: UpdatePhotoReviewDto) {
    const review = await this.reviewService.findOne(updatePhotoReviewDto.reviewId);

    let dataPhotoReview = new PhotoReview();
    dataPhotoReview.pathPhoto = updatePhotoReviewDto.pathPhoto;
    dataPhotoReview.review = review;

    try {
      await this.photoreviewsRepository.findOneOrFail({
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

    const result = await this.photoreviewsRepository.update(id, dataPhotoReview);

    return this.photoreviewsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete photoreview
  async remove(id: string) {
    try {
      await this.photoreviewsRepository.findOneOrFail({
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

    await this.photoreviewsRepository.delete(id);
  }
}
