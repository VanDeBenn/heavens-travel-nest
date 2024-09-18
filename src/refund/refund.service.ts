import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRefundDto } from './dto/create-refund.dto';
import { UpdateRefundDto } from './dto/update-refund.dto';
import { Refund } from './entities/refund.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class RefundService {
  constructor(
    @InjectRepository(Refund)
    private refundsRepository: Repository<Refund>,
  ) {}

  // create new refund
  async create(createRefundDto: CreateRefundDto) {
    const dataRefund = new Refund();

    const result = await this.refundsRepository.insert(dataRefund);

    return this.refundsRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.refundsRepository.findAndCount({
      relations: {
        bookingdetail: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.refundsRepository.findOneOrFail({
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

  // update refund
  async update(id: string, updateRefundDto: UpdateRefundDto) {
    let dataRefund = new Refund();

    try {
      await this.refundsRepository.findOneOrFail({
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

    const result = await this.refundsRepository.update(id, dataRefund);

    return this.refundsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete refund
  async remove(id: string) {
    try {
      await this.refundsRepository.findOneOrFail({
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

    await this.refundsRepository.delete(id);
  }
}
