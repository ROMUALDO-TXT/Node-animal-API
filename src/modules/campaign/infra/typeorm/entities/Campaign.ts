import { BankAccount } from '../../../../ongs/infra/typeorm/entities/BankAccount';
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
import { Ong } from '../../../../ongs/infra/typeorm/entities/Ong';

@Entity('campaigns')
class Campaign {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  idCampaign!: string;

  @Column()
  name!: string;

  @Column()
  description?: string;

  @Column()
  isActive!: boolean;

  @Column()
  isApproved!: boolean;

  @Column('decimal', { precision: 10, scale: 2 })
  amountExpected?: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amountCollected?: number;

  @Column()
  picture!: string;

  @ManyToOne(() => Ong, ong => ong.campaings, {
    eager: true,
    onDelete: 'CASCADE',
  })
  ong!: Ong;

  @OneToOne(() => BankAccount, { eager: true })
  @JoinColumn()
  account!: BankAccount;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}

export { Campaign };
