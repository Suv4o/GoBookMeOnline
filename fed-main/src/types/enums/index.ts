export enum AccessLevel {
  PUBLIC = 'PUBLIC',
  // DEFAULT USER
  DEFAULT_USER_NOT_AUTHENTICATED = 'DEFAULT_USER_NOT_AUTHENTICATED',
  DEFAULT_USER_AUTHENTICATED = 'DEFAULT_USER_AUTHENTICATED',
  DEFAULT_USER_AUTHENTICATED_WITHOUT_EMAIL_VERIFIED = 'DEFAULT_USER_AUTHENTICATED_WITHOUT_EMAIL_VERIFIED',
  DEFAULT_USER_WAITING_FOR_PHONE_VERIFICATION = 'DEFAULT_USER_WAITING_FOR_PHONE_VERIFICATION',
  // DEFAULT PROVIDER
  DEFAULT_PROVIDER_NOT_AUTHENTICATED = 'DEFAULT_PROVIDER_NOT_AUTHENTICATED',
  DEFAULT_PROVIDER_AUTHENTICATED = 'DEFAULT_PROVIDER_AUTHENTICATED',
  DEFAULT_PROVIDER_AUTHENTICATED_WITHOUT_EMAIL_VERIFIED = 'DEFAULT_PROVIDER_AUTHENTICATED_WITHOUT_EMAIL_VERIFIED',
  DEFAULT_PROVIDER_WAITING_FOR_PHONE_VERIFICATION = 'DEFAULT_PROVIDER_WAITING_FOR_PHONE_VERIFICATION',
}

export enum Roles {
  USER_DEFAULT = 'USER_DEFAULT',
  PROVIDER_DEFAULT = 'PROVIDER_DEFAULT',
  ADMIN = 'ADMIN',
}
