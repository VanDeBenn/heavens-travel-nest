import { BookingDetail } from '#/booking-detail/entities/booking-detail.entity';
import { Cart } from '#/cart/entities/cart.entity';
import { Destination } from '#/destinations/entities/destination.entity';
import { Refund } from '#/refund/entities/refund.entity';
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
    JoinColumn,
    OneToOne,
    ManyToOne,
  } from 'typeorm';
  
  @Entity()
  export class Booking  {
    findOne(bookingId: string) {
      throw new Error('Method not implemented.');
    }
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    customerName: string;
  
    @Column()
    customerEmail: string;
  
    @Column()
    CustomerPhoneNumber: number;
  
    @Column()
    guestName: string;
  
    @Column()
    guestEmail: string;
  
    @Column()
    guestPhoneNumber: number;

    @Column()
    endDate: Date;

    @Column()
    quantity: number;

    @Column()
    priceDetail: number;
  
    @Column({
      type: 'enum',
      enum: ['bank', 'e-wallet', 'virtual account'],
    })
    paymentType: string;
  
    @Column()
    paymentDueDate: string;
  
    @Column()
    paymentAmount: number;

    @Column()
    tokenTransaction: number;
  
    @Column()
    totalPrice: number;
  
    @Column()
    statusPayment: string;
  
    @Column()
    fullFilment: string;
  
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
  }
  
  