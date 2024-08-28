import { IsAlpha, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phoneNumber: number;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  birtDate: Date;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  roleId: string;
}
