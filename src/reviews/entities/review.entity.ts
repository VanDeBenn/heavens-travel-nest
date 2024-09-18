import { BookingDetail } from '#/booking-detail/entities/booking-detail.entity';
import { PhotoReview } from '#/foto-reviews/entities/foto-review.entity';
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
  
    @Column()
    rating: number;

    @Column()
    Comment: string;

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
  }
  