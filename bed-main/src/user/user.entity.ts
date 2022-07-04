import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from '../shared/types';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column('simple-array', { nullable: false })
  firebaseIds: string[];

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ unique: true, nullable: true })
  phoneNumber: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'enum', enum: Roles, nullable: false })
  role: string;
}
