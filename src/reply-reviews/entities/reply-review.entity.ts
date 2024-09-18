import { Review } from '#/reviews/entities/review.entity';
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
  export class ReplyReview {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    Comment: string;

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

  @ManyToOne(() => Review, (review) => review.replyreviews)
  @JoinColumn()
  review?: Review;

  @ManyToOne(() => User, (user) => user.replyreviews)
  @JoinColumn()
  user?: User;
  }
  