import { Blog } from '#/blogs/entities/blog.entity';
import { BookingDetail } from '#/booking-detail/entities/booking-detail.entity';
import { Cart } from '#/cart/entities/cart.entity';
import { CategoriesFaq } from '#/categories-faqs/entities/categories-faqs.entity';
import { District } from '#/districts/entities/district.entity';
import { PhotoDestination } from '#/foto-destinations/entities/foto-destination.entity';
import { User } from '#/users/entities/user.entity';
import { Wishlist } from '#/wishlist/entities/wishlist.entity';
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
} from 'typeorm';

@Entity()
export class Destination {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  priceAdult: number;

  @Column()
  priceChildren: number;

  @Column()
  maxCapacity: number;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column()
  pathLocation: string;

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
  
  @OneToMany(() => Blog, (blog) => blog.destination)
  blogs?: Blog[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.destination)
  wishlists?: Wishlist[];

  @OneToMany(() => Cart, (cart) => cart.destination)
  carts?: Cart[];

  @OneToMany(() => PhotoDestination, (photodestination) => photodestination.destination)
  photodestinations?: PhotoDestination[];
  
  @OneToMany(() => CategoriesFaq, (categoriesfaq) => categoriesfaq.destination)
  categoriesfaqs?: CategoriesFaq[];
  
  @OneToMany(() => BookingDetail, (bookingdetail) => bookingdetail.destination)
  bookingdetails?: BookingDetail[];
  
  @ManyToOne(() => District, (district) => district.destinations)
  @JoinColumn()
  district: District;
}
