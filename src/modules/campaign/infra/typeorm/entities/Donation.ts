import { Tutor } from '../../../../tutors/infra/typeorm/entities/Tutor';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Campaign } from './Campaign';

@Entity('donations')
class Donation {
  @PrimaryColumn()
  id!: string;

  @Column()
  status!: 'PENDING' | 'PAID' | 'AWAITING' | 'FAILED';

  @Column()
  donationDate!: Date;

  @Column({ scale: 10, precision: 2 })
  amount!: number;

  @OneToOne(() => Tutor)
  tutor!: Tutor;

  @OneToOne(() => Campaign)
  campaign!: Campaign;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}

export { Donation };
