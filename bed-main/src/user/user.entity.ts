import { Column, PrimaryColumn, Entity } from 'typeorm';
import { Roles } from '../shared/types';

@Entity('user')
export class UserEntity {
  @PrimaryColumn('varchar', { length: 36 })
  id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ type: 'enum', enum: Roles, nullable: false })
  role: string;
}
