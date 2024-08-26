import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: 'guest',
  })
  fullName: string;

  @Column()
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: 'unknown',
  })
  phoneNumber: string;

  @Column({
    type: "enum",
    enum: ["male", "female", "other"],
    default: "other"
  })
  gender: string;

  @Column('date')
  birtDate: Date;

  @Column('text')
  address: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: 'unknown',
  })
  password: string;

  @Column({ default: true })
  isActive: boolean;

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
}
