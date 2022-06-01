import { User } from 'firebase/auth'

export interface VueRefTargetElement extends HTMLElement {
  $el: HTMLElement
}

// Add new properties to this interface as needed
export interface FirebaseUserResponse extends User {
  accessToken: string
  stsTokenManager: {
    accessToken: string
    expirationTime: number
    refreshToken: string
  }
}

export interface AuthStateUser {
  uid: string
  firstName: string
  lastName: string
  role: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  emailVerified: boolean | undefined
}
