import { IsNotEmpty } from 'class-validator';

export class CreateCategoriesServiceAmenityDto{
    @IsNotEmpty()
    title: string;
}


 