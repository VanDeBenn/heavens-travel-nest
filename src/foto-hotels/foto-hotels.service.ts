import { Injectable } from '@nestjs/common';
import { CreatephotoHotelsDto } from './dto/create-foto-hotel.dto';
import { UpdateFotoHotelDto } from './dto/update-foto-hotel.dto';

@Injectable()
export class FotoHotelsService {
  create(createFotoHotelDto: CreatephotoHotelsDto) {
    return 'This action adds a new fotoHotel';
  }

  findAll() {
    return `This action returns all fotoHotels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fotoHotel`;
  }

  update(id: number, updateFotoHotelDto: UpdateFotoHotelDto) {
    return `This action updates a #${id} fotoHotel`;
  }

  remove(id: number) {
    return `This action removes a #${id} fotoHotel`;
  }
}
