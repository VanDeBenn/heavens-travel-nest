import { IsNotEmpty } from 'class-validator';

export class CreateRoomTypeDto {

  @IsNotEmpty()
  name: string;
 
  @IsNotEmpty()
  roomHotelId: string;

}
