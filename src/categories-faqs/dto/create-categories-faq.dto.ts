import { IsNotEmpty } from 'class-validator';

export class CreateCategoriesFaqDto {
    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    detinationId: string;
    
    @IsNotEmpty()
    hotelId: string;
}

