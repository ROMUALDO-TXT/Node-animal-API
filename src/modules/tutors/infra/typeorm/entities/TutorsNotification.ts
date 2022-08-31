import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tutor } from './Tutor';

@Entity('tutorsNotifications')
class TutorsNotification {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  subject!: string;

  @Column()
  read!: boolean;

  @Column()
  ongPicture!: string;

  @ManyToOne(() => Tutor, tutor => tutor.notifications, { onDelete: 'CASCADE' })
  tutor!: Tutor;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}

export { TutorsNotification };
