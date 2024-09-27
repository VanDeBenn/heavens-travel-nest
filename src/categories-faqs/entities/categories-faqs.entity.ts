import { Destination } from '#/destinations/entities/destination.entity';
import { Faq } from '#/faqs/entities/faq.entity';
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
  export class CategoriesFaq {
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

    @OneToMany(() => Faq, (faq) => faq.categoriesfaq)
    faqs?: Faq[];

    @ManyToOne(() => Hotel, (hotel) => hotel.categoriesfaqs)
    @JoinColumn()
    hotel: Hotel;

    @ManyToOne(() => Destination, (destination) => destination.categoriesfaqs)
    @JoinColumn()
    destination: Destination;
}
  