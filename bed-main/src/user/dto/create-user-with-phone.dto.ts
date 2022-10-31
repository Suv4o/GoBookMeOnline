import { PickType } from '@nestjs/mapped-types';
import { CreateUserWithEmailDto } from './create-user-with-email.dto';

export class CreateUserWithPhoneDto extends PickType(CreateUserWithEmailDto, [
  'firstName',
  'lastName',
  'role',
] as const) {}
