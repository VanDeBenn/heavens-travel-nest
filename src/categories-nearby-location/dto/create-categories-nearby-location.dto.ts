import { IsNotEmpty } from 'class-validator';

export class CreateCategoriesNearbyLocationDto {
    @IsNotEmpty()
    title: string;
}
