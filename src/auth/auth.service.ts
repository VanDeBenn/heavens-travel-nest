import { MailService } from './../service/mail.service';
import { RolesService } from '#/roles/roles.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '#/users/entities/user.entity';
import { MoreThan, Repository } from 'typeorm';
import { randomInt, randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '#/users/dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private roleService: RolesService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  // signup
  async signup(createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  // login
  async login(dto: { email: string; password: string }) {
    const { email, password } = dto;

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new HttpException('Email not found', 404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid password', 403);
    }

    const tokens = await this.generateUserTokens(email);

    return {
      token: tokens,
    };
  }

  // logout
  async logout(dto: { email: string }) {
    const { email } = dto;
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    user.refreshToken = null;

    await this.usersRepository.save(user);
  }

  // change password
  async changePassword(
    id: string,
    dto: { currentPassword: string; newPassword: string },
  ) {
    const { currentPassword, newPassword } = dto;

    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      throw new HttpException('Wrong credentials', 403);
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newHashedPassword;

    await this.usersRepository.save(user);
    return this.usersService.findOne(id);
  }

  // forgot password
  async forgotPassword(dto: { email: string }) {
    const email = dto.email;

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const resetToken = user.resetToken;

    this.generateOtp(email);
    return { email, resetToken };
  }

  // verify OTP
  async verifyOtp(token: string, otp: number) {
    await this.mailService.verifyOtp(token, otp);
    return { token };
  }

  // generate OTP
  async generateOtp(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const otp = randomInt(1000, 9999);
    const resetToken = randomUUID();
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 10);

    user.resetToken = resetToken;
    user.expiryDate = expiryDate;

    await this.usersRepository.save(user);
    await this.mailService.sendPasswordResetEmail(user.email, resetToken, otp);

    return { token: resetToken };
  }

  // reset password
  async resetPassword(dto: { newPassword: string; resetToken: string }) {
    const { newPassword, resetToken } = dto;

    const user = await this.usersRepository.findOne({
      where: {
        resetToken,
        expiryDate: MoreThan(new Date()),
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetToken = null;
    user.expiryDate = null;

    await this.usersRepository.save(user);
  }

  // refresh tokens
  async refreshTokens(dto: { refreshToken: string }) {
    const { refreshToken } = dto;

    const user = await this.usersRepository.findOne({
      where: {
        refreshToken,
        expiryDate: MoreThan(new Date()),
      },
    });

    if (!user) {
      throw new UnauthorizedException('Refresh Token is invalid or expired');
    }

    return this.generateUserTokens(user.email);
  }

  // generate tokens
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

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '10h',
    });

    const refreshToken = randomUUID();

    await this.storeRefreshToken(refreshToken, user.id);

    return {
      accessToken,
      refreshToken,
    };
  }

  // store refresh token
  async storeRefreshToken(token: string, id: string) {
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
