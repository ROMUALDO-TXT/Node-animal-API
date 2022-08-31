import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('signatures')
class Signature {
  @PrimaryColumn()
  id!: string;

  @Column()
  status!: 'ACTIVE' | 'CONCLUDED' | 'CANCELED' | 'INACTIVE' | 'FAILED';

  @Column()
  createdOn!: Date;

  @Column()
  startsOn!: Date;

  @Column()
  nextBillingDate!: Date;

  @Column()
  dueDay!: string;

  @Column()
  accessLink!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}

export { Signature };
