import { Ong } from '../../../../ongs/infra/typeorm/entities/Ong';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AnimalPictures } from './AnimalPicture';
import { Adoption } from '../../../../adoptions/infra/typeorm/entities/Adoption';

@Entity('animals')
class Animal {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  bornDate!: Date;

  @Column()
  shelterEnterDate!: Date;

  @Column()
  sex!: string; //"Male" | "Female" ;

  @Column()
  size!: string; // "P" | "M" | "G";

  @Column()
  species!: string;

  @Column()
  type!: string; //"Adoption" | "Patronize";

  //Partronize fields
  @Column()
  costsDescription?: string;

  @Column('decimal', { precision: 10, scale: 2 })
  monthlyCosts?: number;

  //Adoption fields
  @Column()
  isAvailable!: boolean;

  @Column()
  adoptionDate?: Date;

  @OneToMany(() => AnimalPictures, picture => picture.animal, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  pictures!: AnimalPictures[];

  @OneToMany(() => Adoption, adoption => adoption.animal)
  adoptions!: Adoption[];

  @ManyToOne(() => Ong, ong => ong.animals, {
    eager: true,
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

export { Animal };
