import { Blog } from '#/blogs/entities/blog.entity';
import { Role } from '#/roles/entities/role.entity';
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

  @Column('varchar', { length: 255 })
  fullName: string;

  @Column('varchar', { length: 32 })
  email: string;

  @Column('bigint')
  phoneNumber: number;

  @Column({
    type: 'enum',
    enum: ['male', 'female', 'other'],
    default: 'other',
  })
  gender: string;

  @Column()
  birtDate: Date;

  @Column('varchar', { length: 255 })
  address: string;

  @Column('varchar', { length: 32 })
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

  // @Column({ name: 'role_id' })
  // roleId: string;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[];
  result: { id: string; };
}
