import { initializeApp } from 'firebase/app'
import { FirebaseApp } from '@firebase/app/dist/app-public'
import { getAuth } from 'firebase/auth'

function initializeFirebaseApp(): FirebaseApp {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_FIREBASE_APPID,
  }

  return initializeApp(firebaseConfig)
}

export const auth = getAuth(initializeFirebaseApp())
