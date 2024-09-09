import { Exclude } from 'class-transformer';
import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(10, 15)
  @Matches(/^[0-9]+$/)
  phoneNumber: string;

  @IsOptional()
  gender: string;

  @IsOptional()
  birtDate: Date;

  @IsOptional()
  address: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  refreshToken: string;

  @IsOptional()
  resetToken: string;

  @IsOptional()
  expiryDate: Date;

  @IsOptional()
  roleId: string;
}
