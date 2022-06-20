import { Expose, Transform } from 'class-transformer';

export class SerializeUserDto {
  @Expose()
  readonly uid: string;

  @Expose()
  @Transform(({ obj }) => obj.customClaims.firstName)
  readonly firstName: string;

  @Expose()
  @Transform(({ obj }) => obj.customClaims.lastName)
  readonly lastName: string;

  @Expose()
  @Transform(({ obj }) => obj.customClaims.role)
  readonly role: string;

  @Expose()
  readonly email: string;

  @Expose()
  readonly phoneNumber: string;

  @Expose()
  readonly displayName: string;

  @Expose()
  readonly photoURL: string;

  @Expose()
  readonly emailVerified: boolean;

  @Expose()
  readonly customToken: string;
}
