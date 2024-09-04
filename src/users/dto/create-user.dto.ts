import { Exclude } from 'class-transformer';
import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  phoneNumber: number;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  birtDate: Date;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  refreshToken: string;

  @IsOptional()
  resetToken: string;

  @IsOptional()
  expiryDate: Date;

  @IsNotEmpty()
  roleId: string;
}
