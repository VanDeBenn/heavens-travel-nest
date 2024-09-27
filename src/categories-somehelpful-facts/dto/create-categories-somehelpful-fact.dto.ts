import { IsNotEmpty } from 'class-validator';

export class CreateCategoriSomehelpfulFactDto {
    @IsNotEmpty()
    title: string;
   
    @IsNotEmpty()
    hotelId: string;
}

