import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { FirebaseUserRecord, Roles } from '../shared/types';
import { CreateUserWithEmailDto } from './dto/create-user-with-email.dto';

describe('UserService', () => {
  let service: UserService;
  let fakeUserService: Partial<UserService>;

  beforeEach(async () => {
    fakeUserService = {
      createUserWithEmail: (
        createUserRequest: CreateUserWithEmailDto,
        existingUser: UserEntity,
      ) => {
        const { email, firstName, lastName } = createUserRequest;

        return Promise.resolve({
          uid: 'f4EZDKBkcxf7d3nrR4geOZhxESu1',
          email: email,
          emailVerified: false,
          displayName: `${firstName} ${lastName}`,
          photoURL: undefined,
          phoneNumber: undefined,
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
            internalId: existingUser ? String(existingUser.id) : '22',
            firstName: 'Test',
            lastName: 'User',
            role: 'USER_DEFAULT',
          },
          tokensValidAfterTime: 'Tue, 05 Jul 2022 14:19:59 GMT',
          tenantId: undefined,
          customToken:
            'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTY1NzAzMDgwMCwiZXhwIjoxNjU3MDM0NDAwLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1rOG94bEBnby1ib29rLW1lLXRvZGF5LWRldi5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLWs4b3hsQGdvLWJvb2stbWUtdG9kYXktZGV2LmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoiZjRFWkRLQmtjeGY3ZDNuclI0Z2VPWmh4RVN1MSIsImNsYWltcyI6eyJyb2xlIjoiVVNFUl9ERUZBVUxUIn19.Xtv1muHGfjC29voBJXcVWzHgJcG5t55kkSJV1ko4vBP9nswVFYtE84XOZcUrsPxVi_phP9VfsgDkEzbcFunw5OZlcARjhfp5z2-R1jMdN-79BJ50PiwUP5pO1GqE1vMxXJhIOuDgwsA4E8moUAAd4IIPOWf7Jrkfj5-EmUU9mNXc2FFSMBdOYIirceS01Din9P35-8utdsGlMrnPbzxWHN3PgbyzuHea2QEFFqw2NI27QmKtaKMvT5I_uc_LSPD7qwvVxbRamkc1g5jhdwh_hjEImfVlkE6UaGxqnd3MJXCR5kYJzHo-R22U1E7KwBmdMl-wdhkPDnYIKOUy5d4rzQ',
        }) as Promise<FirebaseUserRecord & { customToken: string }>;
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    service = module.get(UserService);
  });

  it('Can create an instance of user service', async () => {
    expect(service).toBeDefined();
  });

  it('Can a new user with email', async () => {
    const createUserRequest = {
      email: 'test@gobookme.com',
      firstName: 'Test',
      lastName: 'User',
    } as CreateUserWithEmailDto;
    const existingUser = null;

    const user = await service.createUserWithEmail(
      createUserRequest,
      existingUser,
    );
    expect(user).toBeDefined();
    expect(user.email).toEqual(createUserRequest.email);
    expect(user.displayName).toEqual(
      `${createUserRequest.firstName} ${createUserRequest.lastName}`,
    );
    expect(user.emailVerified).toEqual(false);
    expect(user.customClaims.firstName).toEqual(createUserRequest.firstName);
    expect(user.customClaims.lastName).toEqual(createUserRequest.lastName);
    expect(user.customClaims.role).toEqual(Roles.USER_DEFAULT);
  });

  it('Link a user to an exiisting user with email', async () => {
    const createUserRequest = {
      email: 'test@gobookme.com',
      firstName: 'Test',
      lastName: 'User',
    } as CreateUserWithEmailDto;
    const existingUser = {
      id: 23,
      firebaseIds: ['lE5zYr9B54SwCiDXsQLrYljzgeo2'],
      email: 'test@gobookmetoday.com',
      phoneNumber: null,
      firstName: 'Test',
      lastName: 'User',
      role: Roles.USER_DEFAULT,
    } as UserEntity;

    const user = await service.createUserWithEmail(
      createUserRequest,
      existingUser,
    );
    expect(user).toBeDefined();
    expect(user.customClaims.internalId).toEqual(String(existingUser.id));
  });

  //   it('creates a new user with a salted and hashed password', async () => {
  //     const user = await service.signup('asdf@asdf.com', 'asdf');

  //     expect(user.password).not.toEqual('asdf');
  //     const [salt, hash] = user.password.split('.');
  //     expect(salt).toBeDefined();
  //     expect(hash).toBeDefined();
  //   });

  //   it('throws an error if user signs up with email that is in use', async (done) => {
  //     await service.signup('asdf@asdf.com', 'asdf');
  //     try {
  //       await service.signup('asdf@asdf.com', 'asdf');
  //     } catch (err) {
  //       done();
  //     }
  //   });

  //   it('throws if signin is called with an unused email', async (done) => {
  //     try {
  //       await service.signin('asdflkj@asdlfkj.com', 'passdflkj');
  //     } catch (err) {
  //       done();
  //     }
  //   });

  //   it('throws if an invalid password is provided', async (done) => {
  //     await service.signup('laskdjf@alskdfj.com', 'password');
  //     try {
  //       await service.signin('laskdjf@alskdfj.com', 'laksdlfkj');
  //     } catch (err) {
  //       done();
  //     }
  //   });

  //   it('returns a user if correct password is provided', async () => {
  //     await service.signup('asdf@asdf.com', 'mypassword');

  //     const user = await service.signin('asdf@asdf.com', 'mypassword');
  //     expect(user).toBeDefined();
  //   });
});
