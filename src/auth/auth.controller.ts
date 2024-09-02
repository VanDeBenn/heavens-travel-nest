import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() dto) {
    return this.authService.login(dto);
  }

  @Get('user-info')
  getUserInfo(@Request() req) {
    return {
      user_info: req?.user,
    };
  }
}
