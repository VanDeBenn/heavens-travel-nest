import { Facility } from '#/facilities/entities/facility.entity';
import { Hotel } from '#/hotels/entities/hotel.entity';
import { RoomHotel } from '#/room-hotels/entities/room-hotel.entity';
import { ServiceAmenity } from '#/service-amenities/entities/service-amenity.entity';
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
export class CategoriServiceAmenity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

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

  @OneToMany(
    () => ServiceAmenity,
    (serviceamenity) => serviceamenity.categoriserviceamenity,
  )
  serviceamenities?: ServiceAmenity[];

  @ManyToOne(() => Hotel, (hotel) => hotel.categoriserviceamenities)
  @JoinColumn()
  hotel: Hotel;

  @ManyToOne(() => RoomHotel, (roomhotel) => roomhotel.categoriserviceamenities)
  @JoinColumn()
  roomhotel: RoomHotel;

  @OneToMany(() => Facility, (facility) => facility.categoriesServiceAmenitiess)
  facility: Facility[];
}
