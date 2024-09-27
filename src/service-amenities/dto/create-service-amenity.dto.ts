import { IsNotEmpty } from 'class-validator';

export class CreateServiceAmenityDto {
    @IsNotEmpty()
    title: string;
   
    @IsNotEmpty()
    categoriServiceAmenityId: string;
}


