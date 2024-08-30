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
} from 'typeorm';

@Entity()
export class District {
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

  @OneToMany(() => User, (user) => user.district)
  users?: User[];

  @OneToMany(() => Hotel, (hotel) => hotel.district)
  hotels?: Hotel[];

  @OneToMany(() => Destination, (destination) => destination.district)
  destinations?: Destination[];
}
