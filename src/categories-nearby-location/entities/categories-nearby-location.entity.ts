import { Hotel } from '#/hotels/entities/hotel.entity';
import { NearbyLocation } from '#/nearby-location/entities/nearby-location.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    VersionColumn,
    CreateDateColumn,
    OneToMany,
    JoinColumn,
    ManyToOne,
  } from 'typeorm';
  
  @Entity()
  export class CategoriesNearbyLocation {
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

  @OneToMany(() => NearbyLocation, (nearbylocation) => nearbylocation.categoriesnearbylocation)
  nearbylocations?: NearbyLocation[];

  @ManyToOne(() => Hotel, (hotel) => hotel.categoriesnearbylocations)
  @JoinColumn()
  hotel: Hotel;
  }
  