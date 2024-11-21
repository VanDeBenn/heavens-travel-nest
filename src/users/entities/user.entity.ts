import { Blog } from '#/blogs/entities/blog.entity';
import { Booking } from '#/bookings/entities/booking.entity';
import { Cart } from '#/cart/entities/cart.entity';
import { City } from '#/cities/entities/city.entity';
import { ReplyReview } from '#/reply-reviews/entities/reply-review.entity';
import { Report } from '#/reports/entities/report.entity';
import { Review } from '#/reviews/entities/review.entity';
import { Role } from '#/roles/entities/role.entity';
import { Wishlist } from '#/wishlist/entities/wishlist.entity';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: ['male', 'female', 'other'],
    default: 'other',
    nullable: true,
  })
  gender?: string;

  @Column({ nullable: true, type: 'date' })
  birthDate?: Date;

  @Column({ nullable: true })
  address?: string;

  // @Column({ select: false })
  @Column()
  password: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: true })
  resetToken: string;

  @Column({ nullable: true })
  expiryDate: Date;

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

  @OneToMany(() => Blog, (blog) => blog.user)
  blogs?: Blog[];

  @OneToMany(() => Cart, (cart) => cart.user)
  carts?: Cart[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.user)
  wishlists?: Wishlist[];

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings?: Booking[];

  @OneToMany(() => ReplyReview, (replyreview) => replyreview.user)
  replyreviews?: ReplyReview[];

  @OneToMany(() => Review, (review) => review.user)
  reviews?: Review[];

  @OneToMany(() => Report, (report) => report.user)
  reports?: Report[];

  // @Column({ name: 'role_id' })
  // roleId: string;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn()
  role: Role;

  @ManyToOne(() => City, (city) => city.users)
  @JoinColumn()
  city?: City;
}
