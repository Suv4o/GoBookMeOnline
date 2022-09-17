import { auth } from '../config/firebase.config'
import { signInWithCustomToken } from '@firebase/auth'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { CurrentUserDetails } from '../components/SignupPage/SignupForm.vue'

export async function createUserWithEmail() {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/user/signup-email', {
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
