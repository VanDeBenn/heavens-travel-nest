import { IsNotEmpty } from 'class-validator';

export class CreateCategoriServiceAmenityDto{
    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    hotelId: string;
    
    @IsNotEmpty()
    roomHotelId: string;
}


 