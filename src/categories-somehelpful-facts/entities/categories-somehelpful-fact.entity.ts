import { Hotel } from '#/hotels/entities/hotel.entity';
import { SomehelpfulFact } from '#/somehelpful-facts/entities/somehelpful-fact.entity';
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
  export class CategoriSomehelpfulFact {
  
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

  @OneToMany(() => SomehelpfulFact, (somehelpfulfact) => somehelpfulfact.categorisomehelpfulfact)
  somehelpfulfacts?: SomehelpfulFact[];

  @ManyToOne(() => Hotel, (hotel) => hotel.categorisomehelpfulfacts)
  @JoinColumn()
  hotel: Hotel;
    hotelId: any;
  }
  