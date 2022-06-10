import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
  IsAlpha,
} from 'class-validator';

export class CreateUserEmailPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @MaxLength(20, { message: 'Password must be at most 32 characters long.' })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/, {
    message:
      'Password must include combination of uppercase, lowercase, numbers and special characters.',
  })
  readonly password: string;

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
}
