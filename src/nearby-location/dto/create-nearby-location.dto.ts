import { IsNotEmpty } from 'class-validator';

export class CreateNearbyLocationDto {
    @IsNotEmpty()
    title: string;
}


