import { IsNotEmpty } from 'class-validator';

export class CreateFotoRoomHotelDto {
  @IsNotEmpty()
  pathPhoto: string;
}
