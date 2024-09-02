import { RolesService } from '#/roles/roles.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { HttpException, Injectable } from '@nestjs/common';
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

  async register(registerDto: CreateUserDto): Promise<User> {
    const role = await this.roleService.findOne(registerDto.roleId);
    const salt = await bcrypt.genSalt();
    const userPassword = await bcrypt.hash(registerDto.password, salt);

    const dataUser = new User();
    dataUser.fullName = registerDto.fullName;
    dataUser.email = registerDto.email;
    dataUser.phoneNumber = registerDto.phoneNumber;
    dataUser.gender = registerDto.gender;
    dataUser.birtDate = registerDto.birtDate;
    dataUser.address = registerDto.address;
    dataUser.password = userPassword;
    dataUser.role = role;

    const payload = { ...registerDto, password: userPassword };
    const createdUser = await this.usersRepository.insert(payload);
    return this.usersRepository.findOneOrFail({
      where: {
        id: createdUser.identifiers[0].id,
      },
    });
  }

  async login(dto: { email: string; password: string }) {
    const email = dto.email;
    const password = dto.password;

    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) throw new HttpException('email not found', 404);

    const userPassword = user.password;

    const isPasswordValid = await compare(password, userPassword);
    if (!isPasswordValid) throw new HttpException('invalid password', 403);

    const payload = { id: user.id, email: user.email };

    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
    };

    // return payload;
  }
}
