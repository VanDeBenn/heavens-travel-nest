import { BookingDetail } from '#/booking-detail/entities/booking-detail.entity';
import { Booking } from '#/bookings/entities/booking.entity';
import { Cart } from '#/cart/entities/cart.entity';
import { CategoriServiceAmenity } from '#/categories-service-amenities/entities/categories-service-amenity.entity';
import { PhotoRoomHotel } from '#/foto-room-hotels/entities/foto-room-hotel.entity';
import { Hotel } from '#/hotels/entities/hotel.entity';
import { RoomType } from '#/room-type/entities/room-type.entity';
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
  numberRoom: number;

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

  @OneToMany(() => Booking, (booking) => booking.roomhotel)
  bookings?: Booking[];

  @OneToMany(
    () => CategoriServiceAmenity,
    (categoriserviceamenity) => categoriserviceamenity.roomhotel,
  )
  categoriserviceamenities?: CategoriServiceAmenity[];

  @ManyToOne(() => Cart, (cart) => cart.roomhotel)
  carts?: Cart;

  @OneToMany(() => RoomType, (roomtype) => roomtype.roomhotel)
  roomtypes?: RoomType[];

  @OneToMany(() => PhotoRoomHotel, (photoroomhotel) => photoroomhotel.roomhotel)
  photoroomhotels?: PhotoRoomHotel[];

  @ManyToOne(() => Hotel, (hotel) => hotel.roomhotels)
  @JoinColumn()
  hotel: Hotel;
}
