import { BookingDetail } from '#/booking-detail/entities/booking-detail.entity';
import { Destination } from '#/destinations/entities/destination.entity';
import { PhotoReview } from '#/foto-reviews/entities/foto-review.entity';
import { Hotel } from '#/hotels/entities/hotel.entity';
import { ReplyReview } from '#/reply-reviews/entities/reply-review.entity';
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
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'decimal', precision: 2, scale: 1 })
  rating: number;

  @Column()
  comment: string;

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

  @OneToOne(() => BookingDetail, (bookingdetail) => bookingdetail.review)
  @JoinColumn()
  bookingdetail: BookingDetail;

  @OneToMany(() => ReplyReview, (replyreview) => replyreview.review)
  replyreviews?: ReplyReview[];

  @OneToMany(() => PhotoReview, (photoreview) => photoreview.review)
  photoreviews?: PhotoReview[];

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Destination, (destination) => destination.reviews)
  @JoinColumn()
  destination: Destination;

  @ManyToOne(() => Hotel, (hotel) => hotel.reviews)
  @JoinColumn()
  hotel: Hotel;
}
