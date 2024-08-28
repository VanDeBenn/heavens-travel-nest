import { DestinationsService } from './../destinations/destinations.service';
import { UsersService } from './../users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
    private usersService: UsersService,
    private destinationsService: DestinationsService,
  ) {}

  // create new blog
  async create(createBlogDto: CreateBlogDto) {
    const user = await this.usersService.findOne(createBlogDto.userId);
    const destination = await this.destinationsService.findOne(
      createBlogDto.destinationId,
    );
    const dataBlog = new Blog();
    dataBlog.title = createBlogDto.title;
    dataBlog.description = createBlogDto.description;
    dataBlog.pathPhoto = createBlogDto.pathPhoto;
    dataBlog.user = user;
    dataBlog.destination = destination;

    const result = await this.blogsRepository.insert(dataBlog);

    return this.blogsRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.blogsRepository.findAndCount({
      relations: {
        user: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.blogsRepository.findOneOrFail({
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

  // update blog
  async update(id: string, updateBlogDto: UpdateBlogDto) {
    const user = await this.usersService.findOne(updateBlogDto.userId);
    const destination = await this.destinationsService.findOne(
      updateBlogDto.destinationId,
    );
    const dataBlog = new Blog();
    dataBlog.title = updateBlogDto.title;
    dataBlog.description = updateBlogDto.description;
    dataBlog.pathPhoto = updateBlogDto.pathPhoto;
    dataBlog.user = user;
    dataBlog.destination = destination;

    try {
      await this.blogsRepository.findOneOrFail({
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

    const result = await this.blogsRepository.update(id, dataBlog);

    return this.blogsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete blog
  async remove(id: string) {
    try {
      await this.blogsRepository.findOneOrFail({
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

    await this.blogsRepository.delete(id);
  }
}
