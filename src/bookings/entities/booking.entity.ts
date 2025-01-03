import { BookingDetail } from '#/booking-detail/entities/booking-detail.entity';
import { Cart } from '#/cart/entities/cart.entity';
import { Destination } from '#/destinations/entities/destination.entity';
import { Payment } from '#/payment/entities/payment.entity';
import { Refund } from '#/refund/entities/refund.entity';
import { Report } from '#/reports/entities/report.entity';
import { RoomHotel } from '#/room-hotels/entities/room-hotel.entity';
import { User } from '#/users/entities/user.entity';
import { Xendit } from '#/xendit/entities/xendit.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  customerName: string;

  @Column({ nullable: true })
  customerEmail: string;

  @Column({ nullable: true })
  customerPhoneNumber: string;

  @Column({ nullable: true })
  guestName: string;

  @Column({ nullable: true })
  guestEmail: string;

  @Column({ nullable: true })
  guestPhoneNumber: string;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column({ nullable: true })
  quantityRoom: Number;

  @Column({ nullable: true })
  quantityAdult: Number;

  @Column({ nullable: true })
  quantityChildren: Number;

  // @Column({ nullable: true })
  // quantity: number;

  // @Column({ nullable: true })
  // priceDetail: number;

  // @Column({
  //   type: 'enum',
  //   enum: ['bank', 'e-wallet', 'virtual account'],
  //   nullable: true,
  // })
  // paymentType: string;

  // @Column({ nullable: true })
  // paymentDueDate: string;

  // @Column({ nullable: true })
  // paymentAmount: number;

  // @Column({ nullable: true })
  // tokenTransaction: number;

  // @Column({ nullable: true })
  // totalPrice: number;

  // @Column({
  //   nullable: true,
  //   type: 'enum',
  //   enum: ['PENDING', 'PAID', 'CANCEL', 'REFUND'],
  // })
  // status: string;

  // @Column({ nullable: true })
  // fullFilment: string;

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

  @OneToMany(() => Cart, (cart) => cart.booking)
  carts?: Cart[];

  @OneToMany(() => BookingDetail, (bookingdetail) => bookingdetail.booking)
  bookingdetails?: BookingDetail[];

  @ManyToOne(() => User, (user) => user.bookings)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Destination, (destination) => destination.bookings)
  @JoinColumn()
  destination: Destination;

  @ManyToOne(() => RoomHotel, (roomhotel) => roomhotel.bookings)
  @JoinColumn()
  roomhotel: RoomHotel;

  @OneToOne(() => Payment, (payment) => payment.booking)
  payment?: Payment;

  @OneToOne(() => Refund, (refund) => refund.booking)
  refund?: Refund;

  @OneToOne(() => Report, (report) => report.bookingdetail)
  @JoinColumn()
  report: Report;
}
