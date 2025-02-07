import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsAlpha,
  IsEnum,
} from 'class-validator';
import { Roles } from 'src/shared/types';

export class CreateUserWithEmailDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(2, { message: 'First name must be at least 2 characters long.' })
  @MaxLength(32, { message: 'First name must be at most 32 characters long.' })
  @IsAlpha()
  readonly firstName: string;

  @IsNotEmpty()
  @MinLength(2, { message: 'Last name must be at least 2 characters long.' })
  @MaxLength(32, { message: 'Last name must be at most 32 characters long.' })
  @IsAlpha()
  readonly lastName: string;

  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles;
}
