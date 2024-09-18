import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { PhotoReport } from './entities/foto-report.entity';
import { UpdatePhotoReportDto } from './dto/update-foto-report.dto';
import { CreatePhotoReportDto } from './dto/create-foto-report.dto';

@Injectable()
export class PhotoReportsService {
  constructor(
    @InjectRepository(PhotoReport)
    private photoreportsRepository: Repository<PhotoReport>,
  ) {}

  // create new photoreport
  async create(createPhotoReportDto: CreatePhotoReportDto) {
    const dataPhotoReport = new PhotoReport();

    const result = await this.photoreportsRepository.insert(dataPhotoReport);

    return this.photoreportsRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.photoreportsRepository.findAndCount({
      relations: {
        report: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.photoreportsRepository.findOneOrFail({
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

  // update photoreport
  async update(id: string, updatePhotoReportDto: UpdatePhotoReportDto) {
    let dataPhotoReport = new PhotoReport();

    try {
      await this.photoreportsRepository.findOneOrFail({
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

    const result = await this.photoreportsRepository.update(id, dataPhotoReport);

    return this.photoreportsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete photoreport
  async remove(id: string) {
    try {
      await this.photoreportsRepository.findOneOrFail({
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

    await this.photoreportsRepository.delete(id);
  }
}
