import * as dotenv from 'dotenv'
import { signInWithCustomToken } from '@firebase/auth'
import { initializeApp } from 'firebase/app'
import { FirebaseApp } from '@firebase/app/dist/app-public'
import { getAuth } from 'firebase/auth'
const env = dotenv.config({ path: `./env/.env.${process.env.NODE_ENV}` })

export interface CurrentUserDetails {
  uid: string
  firstName: string
  lastName: string
  role: string
  email: string
  phoneNumber: string
  displayName: string
  photoURL: string
  emailVerified: boolean
  customToken?: string
}

function initializeFirebaseApp(env: dotenv.DotenvConfigOutput): FirebaseApp {
  const firebaseConfig = {
    apiKey: env.parsed?.VITE_FIREBASE_APIKEY,
    authDomain: env.parsed?.VITE_FIREBASE_AUTHDOMAIN,
    projectId: env.parsed?.VITE_FIREBASE_PROJECTID,
    storageBucket: env.parsed?.VITE_FIREBASE_STORAGEBUCKET,
    messagingSenderId: env.parsed?.VITE_FIREBASE_MESSAGINGSENDERID,
    appId: env.parsed?.VITE_FIREBASE_APPID,
  }

  return initializeApp(firebaseConfig)
}

const auth = getAuth(initializeFirebaseApp(env))

export async function createUserWithEmail() {
  const response = await fetch(env.parsed?.VITE_BACKEND_URL + '/user/signup-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'test@test.com',
      firstName: 'Foo',
      lastName: 'Bar',
    }),
  })
  return (await response.json()) as CurrentUserDetails
}

export async function signInWithToken(customToken = '') {
  return await signInWithCustomToken(auth, customToken)
}
