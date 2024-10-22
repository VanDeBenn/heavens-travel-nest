import { Destination } from '#/destinations/entities/destination.entity';
import { Hotel } from '#/hotels/entities/hotel.entity';
import { Province } from '#/provinces/entities/province.entity';
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
} from 'typeorm';

@Entity()
export class City {
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

  @OneToMany(() => User, (user) => user.city)
  users?: User[];

  @OneToMany(() => Hotel, (hotel) => hotel.city)
  hotels?: Hotel[];

  @OneToMany(() => Destination, (destination) => destination.city)
  destinations?: Destination[];

  @ManyToOne(() => Province, (province) => province.cities)
  @JoinColumn()
  province: Province;
}
