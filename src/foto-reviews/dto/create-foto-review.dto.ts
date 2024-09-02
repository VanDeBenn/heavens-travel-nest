import { IsNotEmpty } from 'class-validator';

export class CreateFotoReviewDto {
  @IsNotEmpty()
  pathPhoto: string;
}
