import { Roles } from '../../shared/types';
import { UserEntity } from '../user.entity';

export function databaseMock(): UserEntity[] {
  return [
    {
      id: 1,
      firebaseIds: ['Nmg1FMM1ccdpbZLOQPqpBdMsuOg1'],
      email: 'user1@gobookmetoday.com',
      phoneNumber: '+61411111111',
      firstName: 'UserOne',
      lastName: 'TestOne',
      role: Roles.USER_DEFAULT,
    },
    {
      id: 2,
      firebaseIds: ['Nmg1FMM1ccdpbZLOQPqpBdMsuOg2'],
      email: 'user2@gobookmetoday.com',
      phoneNumber: '+61411111112',
      firstName: 'UserTwo',
      lastName: 'TestTwo',
      role: Roles.USER_DEFAULT,
    },
    {
      id: 3,
      firebaseIds: ['Nmg1FMM1ccdpbZLOQPqpBdMsuOg3'],
      email: 'user3@gobookmetoday.com',
      phoneNumber: '+61411111113',
      firstName: 'UserThree',
      lastName: 'TestThree',
      role: Roles.USER_DEFAULT,
    },
  ] as UserEntity[];
}
