import { FirebaseUserRecord, NestedPartial, Roles } from '../../shared/types';

export function firebaseUserMock(
  userArg: NestedPartial<FirebaseUserRecord & { customToken: string }>,
): FirebaseUserRecord {
  const firebaseUser = {
    uid: 'f4EZDKBkcxf7d3nrR4geOZhxESu4',
    email: 'user@gobookmetoday.com',
    emailVerified: true,
    displayName: 'User Test',
    photoURL: undefined,
    phoneNumber: '+61411111114',
    disabled: false,
    metadata: {
      creationTime: 'Tue, 05 Jul 2022 14:19:59 GMT',
      lastSignInTime: null,
      lastRefreshTime: null,
    },
    providerData: [],
    passwordHash: undefined,
    passwordSalt: undefined,
    customClaims: {
      internalId: '4',
      firstName: 'User',
      lastName: 'Test',
      role: Roles.USER_DEFAULT,
    },
    tokensValidAfterTime: 'Tue, 05 Jul 2022 14:19:59 GMT',
    tenantId: undefined,
  } as FirebaseUserRecord & Partial<{ customToken: string }>;

  Object.keys(userArg).forEach((key) => {
    if (key === 'customClaims') {
      Object.keys(userArg.customClaims).forEach((claimKey) => {
        firebaseUser.customClaims[claimKey] = userArg.customClaims[claimKey];
      });
    } else {
      firebaseUser[key] = userArg[key];
    }
  });

  return firebaseUser;
}
