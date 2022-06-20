import { Column, PrimaryColumn, Entity } from 'typeorm';
import { Roles } from '../shared/types';

@Entity('user')
export class UserEntity {
  @PrimaryColumn('varchar', { length: 36 })
  id: string;

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
