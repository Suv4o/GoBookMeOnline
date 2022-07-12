import { Test } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserController } from '../user.controller';
import { CreateUserWithEmailDto } from '../dto/create-user-with-email.dto';
import { serializeUserMock } from './serialize.user.mock';
import { firebaseUserMock } from './firebase.user.mock';
import { CreateUserWithPhoneDto } from '../dto/create-user-with-phone.dto';
import { mockUserService as mockUserServiceExported } from './user.service.spec';
import { SignInUserWithEmailDto } from '../dto/signin-user-with-email.dto';
import { SignInUserWithPhoneDto } from '../dto/signin-user-with-phone.dto';

describe('UserController', () => {
  let controller: UserController;
  let mockUserService: Partial<UserService>;

  beforeEach(async () => {
    mockUserService = { ...mockUserServiceExported };

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

  it('created user with phone', async () => {
    const createUserRequest = {
      firstName: 'User',
      lastName: 'Test',
    } as CreateUserWithPhoneDto;

    const currentUser = firebaseUserMock({
      email: undefined,
      emailVerified: false,
      displayName: undefined,
      customClaims: {
        internalId: '4',
      },
    });
    const existingUser = null;

    const user = await controller.signUpUserWithPhone(
      createUserRequest,
      currentUser,
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
    expect(serializeUser.phoneNumber).toBeDefined();
    expect(serializeUser.displayName).toBeDefined();
  });

  it('created user with provider', async () => {
    const currentUser = firebaseUserMock({
      emailVerified: true,
    });
    const existingUser = null;

    const user = await controller.signUpUserProvider(currentUser, existingUser);

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
    expect(serializeUser.emailVerified).toEqual(true);
  });

  it('sign in user with email', async () => {
    const signInUserRequest: SignInUserWithEmailDto = {
      email: 'user2@gobookmetoday.com',
    };

    const user = await controller.signInUserWithEmail(signInUserRequest);

    expect(user).toBeUndefined();
  });

  it('sign in user with phone', async () => {
    const signInUserRequest: SignInUserWithPhoneDto = {
      phoneNumber: '+61411111111',
    };

    const user = await controller.signInUserWithPhone(signInUserRequest);

    expect(user).toBeDefined();
    expect(user.phoneNumber).toEqual(signInUserRequest.phoneNumber);
  });

  it('send email verification link', async () => {
    const user = firebaseUserMock({
      emailVerified: false,
    });

    const link = await controller.sendEmailVerificationLink(user);

    expect(link).toBeUndefined();
  });
});
