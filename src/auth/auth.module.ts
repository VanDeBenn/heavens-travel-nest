import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '#/users/users.module';
import { RolesModule } from '#/roles/roles.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '#/users/entities/user.entity';
import { MailService } from '#/service/mail.service';
import { GoogleStrategy } from './google.strategy';
import { CartModule } from '#/cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    RolesModule,
    CartModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '3d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, MailService, GoogleStrategy],
})
export class AuthModule {}
