import { CategoriesFaq } from '#/categories-faqs/entities/categories-faqs.entity';
import { CategoriServiceAmenity } from '#/categories-service-amenities/entities/categories-service-amenity.entity';
import { Facility } from '#/facilities/entities/facility.entity';
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
export class ServiceAmenity {
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

  @ManyToOne(
    () => CategoriServiceAmenity,
    (categoriserviceamenity) => categoriserviceamenity.serviceamenities,
  )
  @JoinColumn()
  categoriserviceamenity: CategoriServiceAmenity;

  @OneToMany(() => Facility, (facility) => facility.serviceAmenities)
  facility: Facility[];
}
