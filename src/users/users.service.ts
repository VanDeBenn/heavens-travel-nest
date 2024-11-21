import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from '#/roles/roles.service';
import * as bcrypt from 'bcrypt';
import { CitysService } from '#/cities/cities.service';
import { City } from '#/cities/entities/city.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(City)
    private cityRepository: Repository<City>,
    private roleService: RolesService,
    private citysService: CitysService,
  ) {}

  // create new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const role = await this.roleService.findOne(createUserDto.roleId);
    const salt = await bcrypt.genSalt();
    const userPassword = await bcrypt.hash(createUserDto.password, salt);

    const dataUser = new User();
    dataUser.fullName = createUserDto.fullName;
    dataUser.email = createUserDto.email;
    dataUser.phoneNumber = createUserDto.phoneNumber;
    dataUser.password = userPassword;
    dataUser.role = role;

    const result = await this.usersRepository.insert(dataUser);
    return this.usersRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.usersRepository.findAndCount({
      relations: {
        city: true,
        role: true,
      },
    });
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.usersRepository.findOneOrFail({
        where: {
          id,
        },
        relations: {
          blogs: true,
          bookings: true,
          carts: {
            destination: true,
            roomHotel: true,
            bookingDetail: { booking: { payment: true } },
          },
          city: { province: { country: true } },
          replyreviews: true,
          reports: true,
          reviews: true,
          role: true,
          wishlists: { destination: true, hotel: true },
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

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  // update user
  async update(id: string, updateUserDto: UpdateUserDto) {
    const role = await this.roleService.findOne(updateUserDto.roleId);
    const city = await this.cityRepository.findOne({
      where: {
        name: updateUserDto.cityName,
        province: { name: updateUserDto.provinceName },
        // country: { name: dto.countryName },
      },
    });

    if (!city) {
      throw new Error('City not found');
    }

    let dataUser = new User();
    dataUser.fullName = updateUserDto.fullName;
    dataUser.email = updateUserDto.email;
    dataUser.phoneNumber = updateUserDto.phoneNumber;
    dataUser.gender = updateUserDto.gender;
    dataUser.birthDate = updateUserDto.birthDate;
    dataUser.address = updateUserDto.address;
    dataUser.password = updateUserDto.password;
    dataUser.role = role;
    dataUser.city = city;

    try {
      await this.usersRepository.findOneOrFail({
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

    const result = await this.usersRepository.update(id, dataUser);

    return this.usersRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete user
  async remove(id: string) {
    try {
      await this.usersRepository.findOneOrFail({
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

    await this.usersRepository.delete(id);
  }
}
