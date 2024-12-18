import { CategoriesNearbyLocation } from '#/categories-nearby-location/entities/categories-nearby-location.entity';
import { Hotel } from '#/hotels/entities/hotel.entity';
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
export class NearbyLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  location: string;

  @Column()
  distance: string;

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

  @ManyToOne(
    () => CategoriesNearbyLocation,
    (categoriesnearbylocation) => categoriesnearbylocation.nearbylocations,
  )
  @JoinColumn()
  categoriesnearbylocation: CategoriesNearbyLocation;

  @ManyToOne(() => Hotel, (hotel) => hotel.nearbyLocation)
  @JoinColumn()
  hotel: Hotel;
}
