import { Test } from '@nestjs/testing';
import { UserService } from '../user.service';
import { databaseMock } from './database.mock';
import { UserController } from '../user.controller';
import { CreateUserWithEmailDto } from '../dto/create-user-with-email.dto';
import { UserEntity } from '../user.entity';
import { serializeUserMock } from './serialize.user.mock';
import { firebaseUserMock } from './firebase.user.mock';

describe('UserController', () => {
  let controller: UserController;
  let mockUserService: Partial<UserService>;
  const mockedDatabase = databaseMock();

  beforeEach(async () => {
    mockUserService = {
      createUserWithEmail: (
        createUserRequest: CreateUserWithEmailDto,
        existingUser: UserEntity,
      ) => {
        return Promise.resolve(
          firebaseUserMock({
            email: createUserRequest.email,
            emailVerified: false,
            phoneNumber: undefined,
            displayName: `${createUserRequest.firstName} ${createUserRequest.lastName}`,
            customClaims: {
              internalId: existingUser ? String(existingUser.id) : '4',
              firstName: createUserRequest.firstName,
              lastName: createUserRequest.lastName,
            },
            customToken:
              'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTY1NzAzMDgwMCwiZXhwIjoxNjU3MDM0NDAwLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1rOG94bEBnby1ib29rLW1lLXRvZGF5LWRldi5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLWs4b3hsQGdvLWJvb2stbWUtdG9kYXktZGV2LmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoiZjRFWkRLQmtjeGY3ZDNuclI0Z2VPWmh4RVN1MSIsImNsYWltcyI6eyJyb2xlIjoiVVNFUl9ERUZBVUxUIn19.Xtv1muHGfjC29voBJXcVWzHgJcG5t55kkSJV1ko4vBP9nswVFYtE84XOZcUrsPxVi_phP9VfsgDkEzbcFunw5OZlcARjhfp5z2-R1jMdN-79BJ50PiwUP5pO1GqE1vMxXJhIOuDgwsA4E8moUAAd4IIPOWf7Jrkfj5-EmUU9mNXc2FFSMBdOYIirceS01Din9P35-8utdsGlMrnPbzxWHN3PgbyzuHea2QEFFqw2NI27QmKtaKMvT5I_uc_LSPD7qwvVxbRamkc1g5jhdwh_hjEImfVlkE6UaGxqnd3MJXCR5kYJzHo-R22U1E7KwBmdMl-wdhkPDnYIKOUy5d4rzQ',
          }),
        ) as any;
      },
    };

    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('create an instance of user controller', async () => {
    expect(controller).toBeDefined();
  });

  it('created user with email', async () => {
    const createUserRequest = {
      email: 'test@gobookme.com',
      firstName: 'User',
      lastName: 'Test',
    } as CreateUserWithEmailDto;
    const existingUser = null;

    const user = await controller.signUpUserWithEmail(
      createUserRequest,
      existingUser,
    );

    // A mock serialized user DTO
    const serializeUser = serializeUserMock(user);

    expect(user).toBeDefined();
    expect(serializeUser).toBeDefined();
    expect(serializeUser.uid).toBeDefined();
    expect(serializeUser.firstName).toBeDefined();
    expect(serializeUser.lastName).toBeDefined();
    expect(serializeUser.role).toBeDefined();
    expect(serializeUser.email).toBeDefined();
    expect(serializeUser.displayName).toBeDefined();
    expect(serializeUser.emailVerified).toEqual(false);
  });
});
