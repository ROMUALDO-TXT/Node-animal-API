import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tutor } from './Tutor';

@Entity('creditCards')
class CreditCard {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  creditCardId!: string;

  @Column()
  last4CardNumber!: string;

  @Column()
  expirationMonth!: string;

  @Column()
  expirationYear!: string;

  @Column()
  brand!: string;

  @ManyToOne(() => Tutor, tutor => tutor.creditCards)
  @JoinColumn()
  tutor!: Tutor;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}

export { CreditCard };
