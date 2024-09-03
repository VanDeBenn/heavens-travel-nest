import { IsNotEmpty } from 'class-validator';

export class CreateCategoriesSomehelpfulFactDto {
    @IsNotEmpty()
    title: string;
}

