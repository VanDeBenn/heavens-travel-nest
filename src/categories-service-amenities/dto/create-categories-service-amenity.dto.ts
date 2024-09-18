import { IsNotEmpty } from 'class-validator';

export class CreateCategoriServiceAmenityDto{
    @IsNotEmpty()
    title: string;
}


 