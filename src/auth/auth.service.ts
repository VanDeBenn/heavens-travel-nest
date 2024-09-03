import { RolesService } from '#/roles/roles.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '#/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '#/users/dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private roleService: RolesService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  async login(dto: { email: string; password: string }) {
    // plain text / input user
    const email = dto.email;
    const password = dto.password;

    // find user by email
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('email not found', 404);
    }

    // fetch email from data user
    const userPassword = user.password;

    // validate password
    const isPasswordValid = await bcrypt.compare(password, userPassword);
    if (!isPasswordValid) {
      throw new HttpException('invalid password', 403);
    }

    // handle data user
    const payload = { user };

    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
    };

    // return payload;
  }

  async changePassword(
    id,
    dto: { email: string; oldPassword: string; newPassword: string },
  ) {
    // plain text / input user
    const email = dto.email;
    const oldPassword = dto.oldPassword;
    const newPassword = dto.newPassword;
    // find user by id
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User not found...', 404);
    }

    // compare the old password with the password in db
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      throw new HttpException('Wrong credentials', 403);
    }

    // change user password
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newHashedPassword;

    const result = await this.usersRepository.update(id, user);
    // await user.save();
    return this.usersRepository.findOneOrFail({
      where: { id },
    });
  }
}
