import { RoomHotel } from '#/room-hotels/entities/room-hotel.entity';
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
  export class PhotoRoomHotel {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    pathPhoto: string;
  
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

  @ManyToOne(() => RoomHotel, (roomhotel) => roomhotel.photoroomhotels)
  @JoinColumn()
  roomhotel: RoomHotel;
  }
  