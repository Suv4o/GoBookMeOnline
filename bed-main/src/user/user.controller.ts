import { Body, Controller, Post } from '@nestjs/common';
import { FirebaseUserRecord } from 'src/shared/types';
import { CreateUserEmailPasswordDto } from './dto/create-user-email-password.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup-email-and-password')
  signUpEmailAndPassword(
    @Body() createUserRequest: CreateUserEmailPasswordDto,
  ): Promise<FirebaseUserRecord> {
    return this.userService.createUserEmailAndPassword(createUserRequest);
  }
}
