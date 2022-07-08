import { Request } from 'express';
import * as firebaseAdminTypes from 'firebase-admin';
import { UserEntity } from 'src/user/user.entity';

export interface ExpressRequest extends Request {
  user: FirebaseUserRecord;
  existingUser: UserEntity;
}
export interface FirebaseUserRecord extends firebaseAdminTypes.auth.UserRecord {
  customClaims: {
    internalId: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

export enum Roles {
  USER_DEFAULT = 'USER_DEFAULT',
  PROVIDER_DEFAULT = 'PROVIDER_DEFAULT',
  ADMIN = 'ADMIN',
}
