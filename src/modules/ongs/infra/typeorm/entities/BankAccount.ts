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

@Entity('bankAccounts')
class BankAccount {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  documentType!: 'CPF' | 'CNPJ';

  @Column()
  document?: string;

  @Column()
  bankNumber!: number;

  @Column()
  agencyNumber!: number;

  @Column()
  accountNumber!: number;

  @Column()
  accountType!: string;

  @ManyToOne(() => Ong, ong => ong.bankAccounts, {
    eager: true,
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

export { BankAccount };
