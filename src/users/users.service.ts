import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from '#/roles/roles.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private roleService: RolesService,
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
        role: true,
        blogs: true,
      },
    });
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.usersRepository.findOneOrFail({
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

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  // update user
  async update(id: string, updateUserDto: UpdateUserDto) {
    const role = await this.roleService.findOne(updateUserDto.roleId);
    let dataUser = new User();
    dataUser.fullName = updateUserDto.fullName;
    dataUser.email = updateUserDto.email;
    dataUser.phoneNumber = updateUserDto.phoneNumber;
    dataUser.gender = updateUserDto.gender;
    dataUser.birtDate = updateUserDto.birtDate;
    dataUser.address = updateUserDto.address;
    dataUser.password = updateUserDto.password;
    dataUser.role = role;

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
