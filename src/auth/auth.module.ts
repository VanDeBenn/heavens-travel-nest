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
import { WishlistModule } from '#/wishlist/wishlist.module';
import { Cart } from '#/cart/entities/cart.entity';
import { Wishlist } from '#/wishlist/entities/wishlist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Cart, Wishlist]),
    UsersModule,
    RolesModule,
    CartModule,
    WishlistModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '3d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, MailService, GoogleStrategy],
})
export class AuthModule {}
