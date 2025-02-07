import { PickType } from '@nestjs/mapped-types';
import { CreateUserWithEmailDto } from './create-user-with-email.dto';

export class SignInUserWithEmailDto extends PickType(CreateUserWithEmailDto, [
  'email',
] as const) {}
