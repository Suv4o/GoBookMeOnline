import { FirebaseUserRecord } from '../../shared/types';
import { SerializeUserDto } from '../dto/serialize.user.dto';

type FirebaseUser =
  | (FirebaseUserRecord & {
      customToken: string;
    })
  | FirebaseUserRecord;

export function serializeUserMock(user: FirebaseUser) {
  const serializeUser = {
    uid: user.uid,
    firstName: user.customClaims.firstName,
    lastName: user.customClaims.lastName,
    role: user.customClaims.role,
    email: user.email,
    phoneNumber: user.phoneNumber,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
  };

  if (user.hasOwnProperty('customToken')) {
    serializeUser['customToken'] = user['customToken'];
  }

  return serializeUser as SerializeUserDto;
}
