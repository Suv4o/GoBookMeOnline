import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { Auth } from '../shared/decorators/auth.decorator';
import { GetExistingUser } from '../shared/interceptors/get-existing-user.interceptor';
import { Serialize } from '../shared/interceptors/serialize.interceptor';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { FirebaseUserRecord } from '../shared/types';
import { CreateUserWithEmailDto } from './dto/create-user-with-email.dto';
import { CreateUserWithPhoneDto } from './dto/create-user-with-phone.dto';
import { SerializeUserDto } from './dto/serialize.user.dto';
import { SignInUserWithEmailDto } from './dto/signin-user-with-email.dto';
import { UserService } from './user.service';
import { ExistingUser } from '../shared/decorators/existing-user.decorator';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Serialize(SerializeUserDto)
  @Post('signup-email')
  @GetExistingUser('email')
  signUpUserWithEmail(
    @Body() createUserRequest: CreateUserWithEmailDto,
    @ExistingUser() existingUser: UserEntity,
  ): Promise<FirebaseUserRecord> {
    return this.userService.createUserWithEmail(
      createUserRequest,
      existingUser,
    );
  }

  @Serialize(SerializeUserDto)
  @Post('signup-phone')
  @GetExistingUser('phoneNumber')
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
  @GetExistingUser('email')
  signUpUserProvider(
    @CurrentUser() currentUser: FirebaseUserRecord,
    @ExistingUser() existingUser: UserEntity,
  ): Promise<FirebaseUserRecord> {
    return this.userService.createUserWithProvider(currentUser, existingUser);
  }

  @Post('signin-email')
  @HttpCode(200)
  signInUserWithEmail(
    @Body() signInUserRequest: SignInUserWithEmailDto,
  ): Promise<void> {
    return this.userService.signInUserWithEmail(signInUserRequest);
  }

  @Auth('USER_DEFAULT')
  @Get('email-verification')
  sendEmailVerificationLink(
    @CurrentUser() currentUser: FirebaseUserRecord,
  ): Promise<void> {
    return this.userService.sendVerificationLink(currentUser);
  }
}
