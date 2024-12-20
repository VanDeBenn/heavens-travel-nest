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

  @Column({ nullable: true })
  priceDetail: number;

  @Column({ nullable: true })
  totalPrice: number;

  @Column({
    type: 'enum',
    enum: ['booked', 'refund', 'pending', 'canceled'],
    nullable: true,
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

  @ManyToOne(() => Booking, (booking) => booking.bookingdetails)
  @JoinColumn()
  booking: Booking;

  @OneToOne(() => Cart)
  @JoinColumn()
  cart: Cart;

  @OneToOne(() => Review, (review) => review.bookingdetail)
  @JoinColumn()
  review: Review;

  @OneToOne(() => Report, (report) => report.bookingdetail)
  @JoinColumn()
  report: Report;
}
