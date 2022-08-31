import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tutor } from '../../../../tutors/infra/typeorm/entities/Tutor';
import { Animal } from '../../../../animals/infra/typeorm/entities/Animal';

@Entity('adoptions')
class Adoption {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  status!: 'Solicitado' | 'Em analise' | 'Aprovado' | 'Negado' | 'Cancelado';

  @Column()
  requestDate?: Date;

  @Column()
  conclusionDate?: Date;

  @Column()
  description?: string;

  @ManyToOne(() => Tutor, tutor => tutor.adoptions, { eager: true })
  tutor!: Tutor;

  @ManyToOne(() => Animal, animal => animal.adoptions, { eager: true })
  animal!: Animal;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}

export { Adoption };
