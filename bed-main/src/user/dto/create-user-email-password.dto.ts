import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
  IsEnum,
  IsAlpha,
} from 'class-validator';
import { Roles } from '../../shared/types';

export class CreateUserEmailPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(20, { message: 'Password must be at most 20 characters long' })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/, {
    message:
      'Password must include combination of uppercase, lowercase, numbers',
  })
  password: string;

  @IsNotEmpty()
  @MinLength(2, { message: 'First name must be at least 2 characters long' })
  @MaxLength(20, { message: 'First name must be at most 20 characters long' })
  @IsAlpha()
  firstName: string;

  @IsNotEmpty()
  @MinLength(2, { message: 'Last name must be at least 2 characters long' })
  @MaxLength(20, { message: 'Last name must be at most 20 characters long' })
  @IsAlpha()
  lastName: string;

  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles;
}
