import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { Auth } from '../shared/decorators/auth.decorator';
import { Serialize } from '../shared/interceptors/serialize.interceptor';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { FirebaseUserRecord, Roles } from '../shared/types';
import { CreateUserWithEmailDto } from './dto/create-user-with-email.dto';
import { CreateUserWithPhoneDto } from './dto/create-user-with-phone.dto';
import { CreateUserWithProviderDto } from './dto/create-user-with-provider.dto';
import { SerializeUserDto } from './dto/serialize.user.dto';
import { SignInUserWithEmailDto } from './dto/signin-user-with-email.dto';
import { UserService } from './user.service';
import { ExistingUser } from '../shared/decorators/existing-user.decorator';
import { UserEntity } from './user.entity';
import { SignInUserWithPhoneDto } from './dto/signin-user-with-phone.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Serialize(SerializeUserDto)
  @Post('signup-email')
  signUpUserWithEmail(
    @Body() createUserRequest: CreateUserWithEmailDto,
    @ExistingUser() existingUser: UserEntity,
  ): Promise<FirebaseUserRecord & { customToken: string }> {
    return this.userService.createUserWithEmail(
      createUserRequest,
      existingUser,
    );
  }

  @Serialize(SerializeUserDto)
  @Post('signup-phone')
  signUpUserWithPhone(
    @Body() createUserRequest: CreateUserWithPhoneDto,
    @CurrentUser() currentUser: FirebaseUserRecord,
    @ExistingUser() existingUser: UserEntity,
  ): Promise<FirebaseUserRecord> {
    return this.userService.createUserWithPhone(
      createUserRequest,
      currentUser,
      existingUser,
    );
  }

  @Serialize(SerializeUserDto)
  @Post('signup-with-provider')
  signUpUserProvider(
    @Body() createUserRequest: CreateUserWithProviderDto,
    @CurrentUser() currentUser: FirebaseUserRecord,
    @ExistingUser() existingUser: UserEntity,
  ): Promise<FirebaseUserRecord> {
    return this.userService.createUserWithProvider(
      createUserRequest,
      currentUser,
      existingUser,
    );
  }

  @Post('signin-email')
  @HttpCode(200)
  signInUserWithEmail(
    @Body() signInUserRequest: SignInUserWithEmailDto,
  ): Promise<void> {
    return this.userService.signInUserWithEmail(signInUserRequest);
  }

  @Post('signin-phone')
  signInUserWithPhone(
    @Body() signInUserRequest: SignInUserWithPhoneDto,
  ): Promise<FirebaseUserRecord> {
    return this.userService.signInUserWithPhone(signInUserRequest);
  }

  @Auth(Roles.USER_DEFAULT, Roles.PROVIDER_DEFAULT, Roles.PROVIDER_PAYED)
  @Get('email-verification')
  sendEmailVerificationLink(
    @CurrentUser() currentUser: FirebaseUserRecord,
  ): Promise<void> {
    return this.userService.sendVerificationLink(currentUser);
  }
}
