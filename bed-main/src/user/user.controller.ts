import { Body, Controller, Post } from '@nestjs/common';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { FirebaseUserRecord } from '../shared/types';
import { CreateUserEmailPasswordDto } from './dto/create-user-email-password.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup-email-and-password')
  signUpUserEmailAndPassword(
    @Body() createUserRequest: CreateUserEmailPasswordDto,
  ): Promise<FirebaseUserRecord> {
    return this.userService.createUserEmailAndPassword(createUserRequest);
  }

  @Post('signup-with-provider')
  signUserUpProvider(
    @CurrentUser() user: FirebaseUserRecord,
  ): Promise<FirebaseUserRecord> {
    return this.userService.createUserWithProvider(user);
  }
}
