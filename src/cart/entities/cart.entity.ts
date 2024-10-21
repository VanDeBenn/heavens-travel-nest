import { BookingDetail } from '#/booking-detail/entities/booking-detail.entity';
import { Booking } from '#/bookings/entities/booking.entity';
import { Destination } from '#/destinations/entities/destination.entity';
import { RoomHotel } from '#/room-hotels/entities/room-hotel.entity';
import { User } from '#/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  quantityAdult: Number;

  @Column({ nullable: true })
  quantityChildren: Number;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

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

  @ManyToOne(() => Booking, (booking) => booking.carts)
  @JoinColumn()
  booking: Booking;

  @ManyToOne(() => User, (user) => user.carts)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Destination, (destination) => destination.carts)
  @JoinColumn()
  destination: Destination;

  @ManyToOne(() => RoomHotel, (roomHotel) => roomHotel.carts)
  @JoinColumn()
  roomHotel: RoomHotel;
}
