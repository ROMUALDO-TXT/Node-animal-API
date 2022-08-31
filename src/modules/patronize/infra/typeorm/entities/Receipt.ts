import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BankAccount } from '../../../../ongs/infra/typeorm/entities/BankAccount';
import { Patronize } from './Patronize';

@Entity('receipts')
class Receipt {
  @PrimaryColumn()
  id!: string;

  @Column()
  description!: string;

  @Column({ name: 'transfer_date' })
  creationDate!: Date;

  @Column({ name: 'transfer_date' })
  transferDate!: Date;

  @OneToOne(() => BankAccount, { eager: true })
  @JoinColumn()
  account!: BankAccount;

  @ManyToOne(() => Patronize, patronize => patronize.receipt, { eager: true })
  @JoinColumn()
  patronize?: Patronize;

  @Column()
  status!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}

export { Receipt };
