import { IsNotEmpty } from "class-validator";

export class CreateCartDto {
    @IsNotEmpty()
    quantity: Number;

    @IsNotEmpty()
    startDate: Date;

    @IsNotEmpty()
    endDate: Date;
    
    @IsNotEmpty()
    userId: string;
    
    @IsNotEmpty()
    destinationId: string;
    
    @IsNotEmpty()
    roomHotelId: string;
}
