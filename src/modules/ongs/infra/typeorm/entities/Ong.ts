import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../../../users/infra/typeorm/entities/User';
import { Animal } from '../../../../animals/infra/typeorm/entities/Animal';
import { Campaign } from '../../../../campaign/infra/typeorm/entities/Campaign';
import { Event } from '../../../../events/infra/typeorm/entities/Event';
import { OngsNotification } from './OngsNotification';
import { BankAccount } from './BankAccount';

@Entity('ongs')
class Ong {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  cnpj!: string;

  @Column()
  isApproved!: boolean;

  @Column()
  description?: string;

  //Avatar picture
  @Column()
  avatar?: string;

  //Banner picture
  @Column()
  banner?: string;

  @OneToOne(() => User, { eager: true, cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  user!: User;

  @OneToMany(() => Campaign, campaing => campaing.ong)
  campaings!: Campaign[];

  @OneToMany(() => Animal, animal => animal.ong)
  animals!: Animal[];

  @OneToMany(() => Event, event => event.ong)
  events!: Event[];

  @OneToMany(() => OngsNotification, notifications => notifications.ong)
  notifications!: OngsNotification[];

  @OneToMany(() => BankAccount, bankAccounts => bankAccounts.ong)
  bankAccounts!: BankAccount[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}

export { Ong };
