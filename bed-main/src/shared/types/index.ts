import * as firebaseAdminTypes from 'firebase-admin';

export interface FirebaseUserRecord extends firebaseAdminTypes.auth.UserRecord {
  firstName: string;
  lastName: string;
  role: string;
}

export enum Roles {
  USER_DEFAULT = 'USER_DEFAULT',
  PROVIDER_DEFAULT = 'PROVIDER_DEFAULT',
  ADMIN = 'ADMIN',
}
