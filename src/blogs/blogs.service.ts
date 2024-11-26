import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { User } from '#/users/entities/user.entity';
import { Destination } from '#/destinations/entities/destination.entity';
import { UsersService } from '#/users/users.service';
import { DestinationsService } from '#/destinations/destinations.service';
import { HotelsService } from '#/hotels/hotels.service';
import { constants } from 'buffer';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
    private usersService: UsersService,
    private destinationService: DestinationsService,
    private hotelService: HotelsService,
  ) {}

  // create new blog
  async create(createBlogDto: CreateBlogDto) {
    const user = await this.usersService.findOne(createBlogDto.userId);

    const destination = await this.destinationService.findOne(
      createBlogDto.destinationId,
    );

    const hotel = await this.hotelService.findOne(createBlogDto.hotelId);

    const dataBlog = new Blog();
    dataBlog.title = createBlogDto.title;
    dataBlog.description = createBlogDto.description;
    dataBlog.pathPhoto = createBlogDto.pathPhoto;
    dataBlog.user = user;
    dataBlog.destination = destination;
    dataBlog.hotel = hotel;

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
        // user: true,
        destination: { city: true },
        hotel: { city: true },
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.blogsRepository.findOneOrFail({
        where: {
          id,
        },
        relations: {
          destination: { city: true },
          hotel: { city: true },
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

    const destination = await this.destinationService.findOne(
      updateBlogDto.destinationId,
    );

    const hotel = await this.hotelService.findOne(updateBlogDto.hotelId);

    let dataBlog = new Blog();
    dataBlog.title = updateBlogDto.title;
    dataBlog.description = updateBlogDto.description;
    dataBlog.pathPhoto = updateBlogDto.pathPhoto;
    dataBlog.user = user;
    dataBlog.destination = destination;
    dataBlog.hotel = hotel;

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

//
