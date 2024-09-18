import { BookingDetail } from '#/booking-detail/entities/booking-detail.entity';
import { Cart } from '#/cart/entities/cart.entity';
import { CategoriServiceAmenity } from '#/categories-service-amenities/entities/categories-service-amenity.entity';
import { PhotoRoomHotel } from '#/foto-room-hotels/entities/foto-room-hotel.entity';
import { Hotel } from '#/hotels/entities/hotel.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class RoomHotel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  price: number;

  @Column()
  adult: number;

  @Column()
  children: number;

  @Column()
  singleBed: number;

  @Column()
  doubleBed: number;

  @Column()
  queenBed: number;

  @Column()
  kingBed: number;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt: Date;

  @OneToMany(() => BookingDetail, (bookingdetail) => bookingdetail.roomhotel)
  bookingdetails?: BookingDetail[];
  
  @OneToMany(() => CategoriServiceAmenity, (categoriserviceamenity) => categoriserviceamenity.roomhotel)
  categoriserviceamenities?: CategoriServiceAmenity[];
  
  @OneToMany(() => Cart, (cart) => cart.roomhotel)
  carts?: Cart[];

  @OneToMany(() => PhotoRoomHotel, (photoroomhotel) => photoroomhotel.roomhotel)
  photoroomhotels?: PhotoRoomHotel[];

  @ManyToOne(() => Hotel, (hotel) => hotel.roomHotels)
  @JoinColumn()
  hotel: Hotel;
}
