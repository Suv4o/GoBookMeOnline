import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { Roles } from '../shared/types';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ type: 'enum', enum: Roles })
  role: string;
}
