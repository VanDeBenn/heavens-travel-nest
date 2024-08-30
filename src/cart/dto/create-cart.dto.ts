import { IsNotEmpty } from "class-validator";

export class CreateCartDto {
    @IsNotEmpty()
        quantity: Number;

    @IsNotEmpty()
    startDate: Date;

    @IsNotEmpty()
    endDate: Date;
}
