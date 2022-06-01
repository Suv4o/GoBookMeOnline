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
