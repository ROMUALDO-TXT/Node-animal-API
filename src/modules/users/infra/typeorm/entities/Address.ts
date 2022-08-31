import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('address')
class Address {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  state!: string;

  @Column()
  city!: string;

  @Column()
  district!: string;

  @Column()
  street!: string;

  @Column()
  number!: string;

  @Column()
  zipcode!: string;

  @Column()
  complement?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}

export default Address;
