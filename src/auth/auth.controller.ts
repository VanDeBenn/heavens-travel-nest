import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../users/users.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '#/users/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '#/users/entities/user.entity';
import { UpdateUserDto } from '#/users/dto/update-user.dto';
import { JWTGuard } from './jwt-guard.auth';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(User)
    private usersService: UsersService,
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return {
      data: await this.authService.signup(createUserDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const token = await this.authService.googleLogin(req);
    const result = await this.jwtService.verifyAsync(token.accessToken);
    res.cookie('access_token', token.accessToken);
    res.cookie('refresh_token', token.refreshToken);
    res.cookie('id', result.sub);

    return res.redirect('http://localhost:3000/profile');
  }

  @Post('login')
  async login(@Body() dto) {
    return {
      data: await this.authService.login(dto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @UseGuards(JWTGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('logout')
  logout(@Request() req) {
    return req.user;
  }

  @Post('refresh')
  async refreshTokens(@Body() dto) {
    return {
      data: await this.authService.refreshTokens(dto),
      statusCode: HttpStatus.OK,
      message: 'success',
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
    return {
      data: await this.authService.forgotPassword(dto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Post('verify-otp')
  async verifyOtp(@Body() dto: { token: string; otp: number }) {
    return {
      data: await this.authService.verifyOtp(dto.token, dto.otp),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Post('send-otp')
  async sendOtp(@Body() dto: { email: string }) {
    const otp = await this.authService.generateOtp(dto.email);
    return {
      statusCode: HttpStatus.OK,
      message: 'OTP sent successfully',
      otp,
    };
  }

  @Put('reset-password')
  async resetPassword(@Body() dto) {
    return {
      data: await this.authService.resetPassword(dto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
