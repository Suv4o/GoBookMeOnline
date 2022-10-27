import { IsNotEmpty, Matches } from 'class-validator';

export class SignInUserWithPhoneDto {
  @IsNotEmpty()
  @Matches(/^\+[1-9]{1}[0-9]{7,16}$/, {
    message:
      'Please enter a valid Mobile Phone. The phone number must start with a + and must be between 7 and 16 digits.',
  })
  readonly phoneNumber: string;
}
