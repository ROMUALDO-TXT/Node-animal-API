import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Animal } from './Animal';

@Entity('animalPictures')
class AnimalPictures {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  filename!: string;

  @ManyToOne(() => Animal, animal => animal.pictures, {
    onDelete: 'CASCADE',
  })
  animal!: Animal;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}

export { AnimalPictures };
