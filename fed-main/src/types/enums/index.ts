export enum AccessLevel {
  Public = 'Public',
  NotAuthenticated = 'NotAuthenticated',
  Authenticated = 'Authenticated',
  AuthenticatedWithoutEmailVerified = 'AuthenticatedWithoutEmailVerified',
  WaitingForPhoneVerification = 'WaitingForPhoneVerification',
}
