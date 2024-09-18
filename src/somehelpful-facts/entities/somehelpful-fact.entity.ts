import { CategoriSomehelpfulFact } from '#/categories-somehelpful-facts/entities/categories-somehelpful-fact.entity';
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
  export class SomehelpfulFact {
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

  @ManyToOne(() => CategoriSomehelpfulFact, (categorisomehelpfulfact) => categorisomehelpfulfact.somehelpfulfacts)
  @JoinColumn()
  categorisomehelpfulfact: CategoriSomehelpfulFact;
  }
  