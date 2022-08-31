import { Adoption } from '../../../../adoptions/infra/typeorm/entities/Adoption';
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
import { TutorsNotification } from './TutorsNotification';
import { CreditCard } from './CreditCard';
import Patronize from '../../../../patronize/infra/typeorm/entities/Patronize';

@Entity('tutors')
class Tutor {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  cpf!: string;

  @Column()
  description!: string;
  //Avatar picture
  @Column()
  avatar!: string;

  //Banner picture
  @Column()
  banner!: string;

  @Column()
  adoptionRequirements!: number;

  @OneToMany(() => CreditCard, creditCard => creditCard.tutor)
  creditCards!: CreditCard[];

  @OneToMany(() => Adoption, adoption => adoption.tutor)
  adoptions!: Adoption[];

  @OneToMany(() => Patronize, patronize => patronize.tutor)
  patronize!: Patronize[];

  @OneToMany(() => TutorsNotification, notifications => notifications.tutor)
  notifications!: TutorsNotification[];

  @OneToOne(() => User, { eager: true, cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  user!: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}

export { Tutor };
