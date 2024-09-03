
import { IsNotEmpty } from 'class-validator';

export class CreateFaqDto {
    @IsNotEmpty()
    title: string;
}

