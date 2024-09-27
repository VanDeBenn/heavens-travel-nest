import { IsNotEmpty } from 'class-validator';

export class CreatePropertyPolicyDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    hotelId: string;
}

