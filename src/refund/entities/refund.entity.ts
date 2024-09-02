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
  export class Report {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    nameofBank: string;
  
    @Column()
    bankAccountNumber: string;
  
    @Column()
    refundReason: string;

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
  