import { initializeApp } from 'firebase/app'
import { FirebaseApp } from '@firebase/app/dist/app-public'
import { getAuth } from 'firebase/auth'

export function initializeFirebaseApp(env: ImportMetaEnv): FirebaseApp {
  const firebaseConfig = {
    apiKey: env.VITE_FIREBASE_APIKEY,
    authDomain: env.VITE_FIREBASE_AUTHDOMAIN,
    projectId: env.VITE_FIREBASE_PROJECTID,
    storageBucket: env.VITE_FIREBASE_STORAGEBUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGINGSENDERID,
    appId: env.VITE_FIREBASE_APPID,
  }

  return initializeApp(firebaseConfig)
}

export const auth = getAuth(initializeFirebaseApp(import.meta.env))
