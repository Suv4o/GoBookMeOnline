import { User } from 'firebase/auth'

export interface VueRefTargetElement extends HTMLElement {
  $el: HTMLElement
}

export interface FirebaseUserResponse extends User {
  accessToken: string
}
