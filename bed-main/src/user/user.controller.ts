import { Body, Controller, Get, Post } from '@nestjs/common';
import { Auth } from '../shared/decorators/auth.decorator';
import { Serialize } from 'src/shared/interceptors/serialize.interceptor';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { FirebaseUserRecord } from '../shared/types';
import { CreateUserEmailPasswordDto } from './dto/create-user-email-password.dto';
import { SerializeUserDto } from './dto/serialize.user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Serialize(SerializeUserDto)
  @Post('signup-email-and-password')
  signUpUserEmailAndPassword(
    @Body() createUserRequest: CreateUserEmailPasswordDto,
  ): Promise<FirebaseUserRecord> {
    return this.userService.createUserEmailAndPassword(createUserRequest);
  }

  @Serialize(SerializeUserDto)
  @Post('signup-with-provider')
  signUserUpProvider(
    @CurrentUser() user: FirebaseUserRecord,
  ): Promise<FirebaseUserRecord> {
    return this.userService.createUserWithProvider(user);
  }

  @Auth('USER_DEFAULT')
  @Get('email-verification')
  sendEmailVerificationLink(
    @CurrentUser() user: FirebaseUserRecord,
  ): Promise<string> {
    return this.userService.sendVerificationLink(user);
  }
}
