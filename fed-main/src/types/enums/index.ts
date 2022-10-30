export enum AccessLevel {
  Public = 'Public',
  DefaultUserNotAuthenticated = 'NotAuthenticated',
  DefaultUserAuthenticated = 'Authenticated',
  DefaultUserAuthenticatedWithoutEmailVerified = 'AuthenticatedWithoutEmailVerified',
  DefaultUserWaitingForPhoneVerification = 'WaitingForPhoneVerification',
}
