import { BookingDetail } from '#/booking-detail/entities/booking-detail.entity';
import { PhotoReview } from '#/foto-reviews/entities/foto-review.entity';
import { ReplyReview } from '#/reply-reviews/entities/reply-review.entity';
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
  export class RoomType {
    @PrimaryGeneratedColumn('uuid')
    id: string;

     @Column()
     name: string;

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

  @ManyToOne(() => RoomHotel, (roomhotel) => roomhotel.roomtypes)
  @JoinColumn()
  roomhotel: RoomHotel;
  }
  