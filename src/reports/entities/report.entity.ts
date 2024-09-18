import { BookingDetail } from '#/booking-detail/entities/booking-detail.entity';
import { PhotoReport } from '#/foto-reports/entities/foto-report.entity';
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
    OneToOne,
    JoinColumn,
    ManyToOne,
  } from 'typeorm';
  
  @Entity()
  export class Report {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    title: string;

    @Column()
    description: string;
  
    @Column()
    pathPhoto: string;
  
    @Column()
    email: string;
  
    @Column()
    replyReport: string;

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

  @OneToOne(() => BookingDetail, (bookingdetail) => bookingdetail.report)
  @JoinColumn()
  bookingdetail: BookingDetail;

  @OneToMany(() => PhotoReport, (photoreport) => photoreport.report)
  photoreports?: PhotoReport[];

  @ManyToOne(() => User, (user) => user.reports)
  @JoinColumn()
  user: User;
  }
  