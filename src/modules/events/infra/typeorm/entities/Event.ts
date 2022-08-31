import { Ong } from '../../../../ongs/infra/typeorm/entities/Ong';
import Address from '../../../../users/infra/typeorm/entities/Address';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('events')
class Event {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  phone!: string;

  @Column()
  description!: string;

  @Column()
  type!: string;

  @Column()
  date!: Date;

  @Column()
  picture!: string;

  @Column()
  isApproved!: boolean;

  @OneToOne(() => Address, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  address!: Address;

  @ManyToOne(() => Ong, ong => ong.events, {
    eager: true,
    onDelete: 'CASCADE',
  })
  ong!: Ong;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}

export { Event };
