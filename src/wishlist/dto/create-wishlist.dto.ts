import { IsAlpha, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWishlistDto {
    @IsNotEmpty()
    userId:string;
    
    @IsNotEmpty()
    destinationId:string;
    
    @IsNotEmpty()
    hotelId:string;


}