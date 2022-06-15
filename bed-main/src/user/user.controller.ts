import { Body, Controller, Get, Post } from '@nestjs/common';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { Serialize } from 'src/shared/interceptors/serialize.interceptor';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { FirebaseUserRecord } from '../shared/types';
import { CreateUserWithEmailDto } from './dto/create-user-with-email.dto';
import { SerializeUserDto } from './dto/serialize.user.dto';
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
  @Post('signup-with-provider')
  signUpUserProvider(
    @CurrentUser() user: FirebaseUserRecord,
  ): Promise<FirebaseUserRecord> {
    return this.userService.createUserWithProvider(user);
  }

  @Auth('USER_DEFAULT')
  @Get('email-verification')
  sendEmailVerificationLink(
    @CurrentUser() user: FirebaseUserRecord,
  ): Promise<void> {
    return this.userService.sendVerificationLink(user);
  }
}
