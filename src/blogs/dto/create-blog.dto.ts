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

  @IsOptional()
  pathPhoto: string;

  @IsNotEmpty()
  userId: string;

  @IsOptional()
  destinationId: string;

  @IsOptional()
  hotelId: string;
}
