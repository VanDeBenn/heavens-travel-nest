import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    VersionColumn,
    CreateDateColumn,
    OneToMany,
  } from 'typeorm';
  
  @Entity()
  export class Booking  {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    customerName: string;
  
    @Column()
    customerEmail: string;
  
    @Column()
    CustomerPhoneNumber: number;
  
    @Column()
    guestName: string;
  
    @Column()
    guestEmail: string;
  
    @Column()
    guestPhoneNumber: number;
  
    @Column({
      type: 'enum',
      enum: ['bank', 'e-wallet', 'virtual account'],
    })
    paymentType: string;
  
    @Column()
    paymentDueDate: string;
  
    @Column()
    paymentAmount: number;
  
    @Column()
    totalPrice: number;
  
    @Column()
    statusPayment: string;
  
    @Column()
    fullFilment: string;
  
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
  
  