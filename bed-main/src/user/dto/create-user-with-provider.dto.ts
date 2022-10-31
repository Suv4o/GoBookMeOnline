import { PickType } from '@nestjs/mapped-types';
import { CreateUserWithEmailDto } from './create-user-with-email.dto';

export class CreateUserWithProviderDto extends PickType(
  CreateUserWithEmailDto,
  ['role'] as const,
) {}
