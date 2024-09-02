import { Blog } from '#/blogs/entities/blog.entity';
import { District } from '#/districts/entities/district.entity';
import { Role } from '#/roles/entities/role.entity';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: number;

  @Column({
    type: 'enum',
    enum: ['male', 'female', 'other'],
    default: 'other',
  })
  gender: string;

  @Column()
  birtDate: Date;

  @Column()
  address: string;

  // @Column({ select: false })
  @Column()
  password: string;

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

  @OneToMany(() => Blog, (blog) => blog.user)
  blogs?: Blog[];

  // @Column({ name: 'role_id' })
  // roleId: string;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => District, (district) => district.users)
  @JoinColumn({ name: 'district_id' })
  district: District;
}
