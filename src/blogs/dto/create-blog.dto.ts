import {
  IsAlpha,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  isNotEmpty,
} from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  pathPhoto: string;

  @IsNotEmpty()
  userId: string;

  @IsOptional()
  destinationId: string;
}
