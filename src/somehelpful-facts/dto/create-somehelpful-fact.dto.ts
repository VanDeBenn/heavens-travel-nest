import { IsNotEmpty } from 'class-validator';

export class CreateSomehelpfulFactDto {
    @IsNotEmpty()
    title: string;
}