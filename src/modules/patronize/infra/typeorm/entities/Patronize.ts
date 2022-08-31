import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tutor } from '../../../../tutors/infra/typeorm/entities/Tutor';
import { Animal } from '../../../../animals/infra/typeorm/entities/Animal';
import { Receipt } from './Receipt';
import { Signature } from './Signature';

@Entity('patronizes')
class Patronize {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  status!: 'ACTIVE' | 'INACTIVE' | 'REQUESTED';

  @Column()
  description!: string;

  @Column({ name: 'conclusion_date' })
  conclusionDate?: Date;

  @Column()
  planName!: string;

  @Column()
  planAmount!: number;

  @Column()
  planId!: string;

  @OneToOne(() => Signature, { eager: true, cascade: true })
  @JoinColumn()
  signature?: Signature;

  @OneToMany(() => Receipt, receipt => receipt.patronize)
  receipt!: Receipt[];

  @ManyToOne(() => Tutor, tutor => tutor.adoptions, { eager: true })
  @JoinColumn()
  tutor!: Tutor;

  @ManyToOne(() => Animal, animal => animal.adoptions, { eager: true })
  @JoinColumn()
  animal!: Animal;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}

export { Patronize };
