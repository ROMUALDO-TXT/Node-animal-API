import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_tokens')
class UserToken {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  @Generated('uuid')
  token!: string;

  @Column({ name: 'user_id' })
  userId!: string;

  @Column({ name: 'expires_in' })
  expiresIn!: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}

export { UserToken };
