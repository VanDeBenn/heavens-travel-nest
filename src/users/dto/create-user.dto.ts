import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  gender: string;
  
  @IsNotEmpty()
  birtDate: string;
  
  @IsNotEmpty()
  address: string;
  
  @IsNotEmpty()
  password: string;
}
