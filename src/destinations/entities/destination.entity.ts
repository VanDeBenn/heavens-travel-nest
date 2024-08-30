import { Blog } from '#/blogs/entities/blog.entity';
import { District } from '#/districts/entities/district.entity';
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
export class Destination {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  priceAdult: number;

  @Column()
  priceChildren: number;

  @Column()
  maxCapacity: number;

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

  @ManyToOne(() => District, (district) => district.destinations)
  @JoinColumn({ name: 'district_id' })
  district: District;

  @OneToMany(() => Blog, (blog) => blog.destination)
  blogs?: Blog[];
}
