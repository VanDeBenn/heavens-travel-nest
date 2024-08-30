import { District } from '#/districts/entities/district.entity';
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
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  rating: number;

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

  @OneToMany(() => RoomHotel, (roomHotel) => roomHotel.hotel)
  roomHotels: RoomHotel;

  @ManyToOne(() => District, (district) => district.users)
  @JoinColumn({ name: 'district_id' })
  district: District;
}
