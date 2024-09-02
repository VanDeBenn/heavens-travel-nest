import { Injectable } from '@nestjs/common';
import { CreateFotoReviewDto } from './dto/create-foto-review.dto';
import { UpdateFotoReviewDto } from './dto/update-foto-review.dto';

@Injectable()
export class FotoReviewsService {
  create(createFotoReviewDto: CreateFotoReviewDto) {
    return 'This action adds a new fotoReview';
  }

  findAll() {
    return `This action returns all fotoReviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fotoReview`;
  }

  update(id: number, updateFotoReviewDto: UpdateFotoReviewDto) {
    return `This action updates a #${id} fotoReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} fotoReview`;
  }
}
