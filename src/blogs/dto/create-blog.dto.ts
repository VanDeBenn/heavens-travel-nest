import { IsAlpha, IsNotEmpty, IsNumber, isNotEmpty } from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  pathPhoto: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  destinationId: string;
}
