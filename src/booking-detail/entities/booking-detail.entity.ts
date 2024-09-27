import { Booking } from '#/bookings/entities/booking.entity';
import { Cart } from '#/cart/entities/cart.entity';
import { Destination } from '#/destinations/entities/destination.entity';
import { Refund } from '#/refund/entities/refund.entity';
import { Report } from '#/reports/entities/report.entity';
import { Review } from '#/reviews/entities/review.entity';
import { RoomHotel } from '#/room-hotels/entities/room-hotel.entity';
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
  OneToOne,
} from 'typeorm';

@Entity()
export class BookingDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  quantity: number;

  @Column()
  priceDetail: number;

  @Column({
    type: 'enum',
    enum: ['booked', 'refund', 'pending', 'canceled'],
  })
  orderStatus: string;

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

  @OneToOne(() => Refund, (refund) => refund.bookingdetail)
  @JoinColumn()
  refund: Refund;

  @OneToOne(() => Review, (review) => review.bookingdetail)
  @JoinColumn()
  review: Review;

  @OneToOne(() => Report, (report) => report.bookingdetail)
  @JoinColumn()
  report: Report;

  @ManyToOne(() => Destination, (destination) => destination.bookingdetails)
  @JoinColumn()
  destination: Destination;

  @ManyToOne(() => RoomHotel, (roomhotel) => roomhotel.bookingdetails)
  @JoinColumn()
  roomhotel: RoomHotel;

  @ManyToOne(() => Booking, (booking) => booking.bookingdetails)
  @JoinColumn()
  booking: Booking;
  cart: any;
}
