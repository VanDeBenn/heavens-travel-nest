import { BookingDetail } from '#/booking-detail/entities/booking-detail.entity';
import { Booking } from '#/bookings/entities/booking.entity';
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
} from 'typeorm';

@Entity()
export class Refund {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nameofBank: string;

  @Column()
  bankAccountNumber: string;

  @Column()
  accountHolder: string;

  @Column()
  refundReason: string;

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

  @OneToOne(() => BookingDetail, (bookingdetail) => bookingdetail.refund)
  @JoinColumn()
  bookingdetail: BookingDetail;
  booking: any;
}
