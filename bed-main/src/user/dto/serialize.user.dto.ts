import { Expose, Transform } from 'class-transformer';

export class SerializeUserDto {
  @Expose()
  uid: string;

  @Expose()
  @Transform((value: any) => value.obj.customClaims.firstName)
  firstName: string;

  @Expose()
  @Transform((value: any) => value.obj.customClaims.lastName)
  lastName: string;

  @Expose()
  @Transform((value: any) => value.obj.customClaims.role)
  role: string;

  @Expose()
  email: string;

  @Expose()
  displayName: string;

  @Expose()
  photoURL: string;

  @Expose()
  emailVerified: boolean;
}
