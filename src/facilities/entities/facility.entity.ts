import { CategoriesServiceAmenitiesModule } from '#/categories-service-amenities/categories-service-amenities.module';
import { CategoriServiceAmenity } from '#/categories-service-amenities/entities/categories-service-amenity.entity';
import { Hotel } from '#/hotels/entities/hotel.entity';
import { ServiceAmenity } from '#/service-amenities/entities/service-amenity.entity';
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
} from 'typeorm';

@Entity()
export class Facility {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: boolean;

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

  @ManyToOne(() => Hotel, (hotel) => hotel.facility)
  hotels?: Hotel;

  @ManyToOne(
    () => CategoriServiceAmenity,
    (categoriesServiceAmenities) => categoriesServiceAmenities.facility,
  )
  categoriesServiceAmenitiess?: CategoriServiceAmenity;

  @ManyToOne(() => ServiceAmenity, (serviceAmenity) => serviceAmenity.facility)
  serviceAmenities?: ServiceAmenity;
}
