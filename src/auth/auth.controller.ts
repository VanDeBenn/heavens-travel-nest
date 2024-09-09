import { UsersService } from './../users/users.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '#/users/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '#/users/entities/user.entity';
import { UpdateUserDto } from '#/users/dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(User)
    private usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return {
      data: await this.authService.signup(createUserDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Post('login')
  async login(@Body() dto) {
    return {
      data: await this.authService.login(dto),
      statusCode: HttpStatus.OK,
      message: 'succes',
    };
  }

  @Post('refresh')
  async refreshTokens(@Body() dto) {
    return {
      data: this.authService.refreshTokens(dto),
      statusCode: HttpStatus.OK,
      message: 'succes',
    };
  }

  @Put('/change-password/:id')
  async changePassword(@Param('id', ParseUUIDPipe) id: string, @Body() dto) {
    return {
      data: await this.authService.changePassword(id, dto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto) {
    console.log(dto);
    return {
      data: this.authService.forgotPassword(dto),
      statusCode: HttpStatus.OK,
      message: 'succes',
    };
  }

  @Put('reset-password')
  async resetPassword(@Body() dto) {
    return {
      data: this.authService.resetPassword(dto),
      statusCode: HttpStatus.OK,
      message: 'succes',
    };
  }

  @Post('logout')
  async logout(@Body() dto) {
    return {
      data: this.authService.logout(dto),
      statusCode: HttpStatus.OK,
      message: 'succes',
    };
  }
}
