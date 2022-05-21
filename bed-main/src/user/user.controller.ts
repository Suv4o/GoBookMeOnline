import { Body, Controller, Post } from '@nestjs/common';
import { FirebaseUserRecord } from 'src/shared/types';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signUp(
    @Body() createUserRequest: CreateUserDto,
  ): Promise<FirebaseUserRecord> {
    return this.userService.createUser(createUserRequest);
  }
}
