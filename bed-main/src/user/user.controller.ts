import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { Serialize } from 'src/shared/interceptors/serialize.interceptor';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { FirebaseUserRecord } from '../shared/types';
import { CreateUserWithEmailDto } from './dto/create-user-with-email.dto';
import { CreateUserWithPhoneDto } from './dto/create-user-with-phone.dto';
import { SerializeUserDto } from './dto/serialize.user.dto';
import { SignInUserWithEmailDto } from './dto/signin-user-with-email.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Serialize(SerializeUserDto)
  @Post('signup-email')
  signUpUserWithEmail(
    @Body() createUserRequest: CreateUserWithEmailDto,
  ): Promise<FirebaseUserRecord> {
    return this.userService.createUserWithEmail(createUserRequest);
  }

  @Serialize(SerializeUserDto)
  @Post('signup-phone')
  signUpUserWithPhone(
    @Body() createUserRequest: CreateUserWithPhoneDto,
    @CurrentUser() user: FirebaseUserRecord,
  ): Promise<FirebaseUserRecord> {
    return this.userService.createUserWithPhone(createUserRequest, user);
  }

  @Serialize(SerializeUserDto)
  @Post('signup-with-provider')
  signUpUserProvider(
    @CurrentUser() user: FirebaseUserRecord,
  ): Promise<FirebaseUserRecord> {
    return this.userService.createUserWithProvider(user);
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
    @CurrentUser() user: FirebaseUserRecord,
  ): Promise<void> {
    return this.userService.sendVerificationLink(user);
  }
}
