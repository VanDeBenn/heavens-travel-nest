import { City } from '#/cities/entities/city.entity';
import { Country } from '#/countries/entities/country.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    VersionColumn,
    CreateDateColumn,
    OneToMany,
    ManyToMany,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  
  @Entity()
  export class Province {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;
  
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

    @OneToMany(() => City, (city) => city.province)
    cities?: City[];

    @ManyToOne(() => Country, (country) => country.provinces)
    @JoinColumn()
    country: Country;
  }
