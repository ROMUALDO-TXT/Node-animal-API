import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Ong } from './Ong';

@Entity('ongsNotifications')
class OngsNotification {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  subject!: string;

  @Column()
  read!: boolean;

  @ManyToOne(() => Ong, ong => ong.notifications, {
    orphanedRowAction: 'delete',
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

export { OngsNotification };
