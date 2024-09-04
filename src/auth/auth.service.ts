import { MailService } from './../service/mail.service';
import { RolesService } from '#/roles/roles.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import {
  HttpException,
  Injectable,
  NotFoundException,
  ParseUUIDPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '#/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { MoreThan, Repository } from 'typeorm';
import { UpdateUserDto } from '#/users/dto/update-user.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private roleService: RolesService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailservice: MailService,
  ) {}

  // signup
  async signup(createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  // login
  async login(dto: { email: string; password: string }) {
    const email = dto.email;
    const password = dto.password;

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new HttpException('email not found', 404);
    }

    const userPassword = user.password;

    const isPasswordValid = await bcrypt.compare(password, userPassword);
    if (!isPasswordValid) {
      throw new HttpException('invalid password', 403);
    }

    const payload = { user };

    const token = await this.generateUserTokens(email);

    return {
      refreshTokens: token,
    };

    // return payload;
  }

  // change password
  async changePassword(
    id,
    dto: { email: string; oldPassword: string; newPassword: string },
  ) {
    const email = dto.email;
    const oldPassword = dto.oldPassword;
    const newPassword = dto.newPassword;

    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new HttpException('User not found...', 404);
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      throw new HttpException('Wrong credentials', 403);
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newHashedPassword;

    const result = await this.usersService.update(id, user);
    return this.usersService.findOne(id);
  }

  async forgotPassword(dto: { email: string }) {
    const email = dto.email;

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new HttpException('user not found...', 404);
    }

    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);
    const resetToken = randomUUID();

    user.resetToken = resetToken;
    user.expiryDate = expiryDate;

    await this.usersRepository.save(user);

    this.mailservice.sendPasswordResetEmail(email, resetToken);

    return { message: 'If this user exists, they will receive an email' };
  }

  // reset password
  async resetPassword(dto: { newPassword: string; resetToken: string }) {
    const newPassword = dto.newPassword;
    const resetToken = dto.resetToken;

    const user = await this.usersRepository.findOne({
      where: {
        resetToken,
        expiryDate: MoreThan(new Date()),
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.expiryDate = null;

    await this.usersRepository.save(user);
  }

  async refreshTokens(dto: { refreshToken: string }) {
    const refreshToken = dto.refreshToken;
    const token = await this.usersRepository.findOne({
      where: {
        refreshToken,
        expiryDate: MoreThan(new Date()),
      },
    });

    if (!token) {
      throw new UnauthorizedException('Refresh Token is invalid');
    }

    return this.generateUserTokens(refreshToken);
  }

  async generateUserTokens(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '10h',
    });

    const refreshToken = randomUUID();

    await this.storeRefreshToken(refreshToken, user.id);

    return {
      accessToken,
      refreshToken,
    };
  }

  async storeRefreshToken(token: string, id: string) {
    // Calculate expiry date 3 days from now
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);

    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.refreshToken = token;
    user.expiryDate = expiryDate;

    await this.usersRepository.save(user);
  }
}
