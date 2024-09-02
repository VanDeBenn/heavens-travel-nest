import { Injectable } from '@nestjs/common';
import { CreateFotoRoomHotelDto } from './dto/create-foto-room-hotel.dto';
import { UpdateFotoRoomHotelDto } from './dto/update-foto-room-hotel.dto';

@Injectable()
export class FotoRoomHotelsService {
  create(createFotoRoomHotelDto: CreateFotoRoomHotelDto) {
    return 'This action adds a new fotoRoomHotel';
  }

  findAll() {
    return `This action returns all fotoRoomHotels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fotoRoomHotel`;
  }

  update(id: number, updateFotoRoomHotelDto: UpdateFotoRoomHotelDto) {
    return `This action updates a #${id} fotoRoomHotel`;
  }

  remove(id: number) {
    return `This action removes a #${id} fotoRoomHotel`;
  }
}
