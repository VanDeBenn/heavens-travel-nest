import { CategoriesFaq } from '#/categories-faqs/entities/categories-faqs.entity';
import { CategoriesNearbyLocation } from '#/categories-nearby-location/entities/categories-nearby-location.entity';
import { CategoriServiceAmenity } from '#/categories-service-amenities/entities/categories-service-amenity.entity';
import { CategoriSomehelpfulFact } from '#/categories-somehelpful-facts/entities/categories-somehelpful-fact.entity';
import { City } from '#/cities/entities/city.entity';
import { PhotoHotel } from '#/foto-hotels/entities/foto-hotel.entity';
import { PropertyPolicy } from '#/property-policies/entities/property-policy.entity';
import { RoomHotel } from '#/room-hotels/entities/room-hotel.entity';
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

  @ManyToOne(() => Wishlist, (wishlist) => wishlist.hotel)
  wishlists?: Wishlist;

  @OneToMany(
    () => CategoriSomehelpfulFact,
    (categorisomehelpfulfact) => categorisomehelpfulfact.hotel,
  )
  categorisomehelpfulfacts?: CategoriSomehelpfulFact[];

  @OneToMany(
    () => CategoriesNearbyLocation,
    (categoriesnearbylocation) => categoriesnearbylocation.hotel,
  )
  categoriesnearbylocations?: CategoriesNearbyLocation[];

  @OneToMany(() => CategoriesFaq, (categoriesfaq) => categoriesfaq.hotel)
  categoriesfaqs?: CategoriesFaq[];

  @OneToMany(() => PhotoHotel, (photohotel) => photohotel.hotel)
  photohotels?: PhotoHotel[];

  @OneToMany(
    () => CategoriServiceAmenity,
    (categoriserviceamenity) => categoriserviceamenity.hotel,
  )
  categoriserviceamenities?: CategoriServiceAmenity[];

  @OneToMany(() => RoomHotel, (roomhotel) => roomhotel.hotel)
  roomhotels?: RoomHotel[];

  @OneToMany(() => PropertyPolicy, (propertypolicy) => propertypolicy.hotel)
  propertypolicys?: PropertyPolicy[];

  @ManyToOne(() => City, (city) => city.hotels)
  @JoinColumn()
  city: City;
}
