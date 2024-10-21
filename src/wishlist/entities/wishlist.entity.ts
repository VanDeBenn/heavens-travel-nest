import { Destination } from '#/destinations/entities/destination.entity';
import { Hotel } from '#/hotels/entities/hotel.entity';
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
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @ManyToOne(() => User, (user) => user.wishlists)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Destination, (destination) => destination.wishlists)
  @JoinColumn()
  destination: Destination;

  @ManyToOne(() => Hotel, (hotel) => hotel.wishlists)
  @JoinColumn()
  hotel: Hotel;
}
