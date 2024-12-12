import { Booking } from '#/bookings/entities/booking.entity';
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
} from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  invoiceId: string;

  @Column({ nullable: true })
  invoiceUrl: string;

  @Column({ nullable: true })
  externalId: string;

  @Column({ nullable: true })
  payerEmail: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  amount: number;

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

  @OneToOne(() => Booking)
  @JoinColumn()
  booking?: Booking;
}
