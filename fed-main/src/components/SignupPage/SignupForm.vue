<script lang="ts">
export default {
  name: 'SignupForm',
}
</script>

<script setup lang="ts">
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { Auth } from '@firebase/auth'
import { Assertions } from '../../types/guards'
import { inject } from 'vue'
import { FirebaseUserResponse } from '../../types/interfaces'
import { useFetch } from '../../utils/composables/fetch'

const googleProvider = new GoogleAuthProvider()
const $auth = inject('$auth') as Auth

async function signInWithGoogle() {
  try {
    await signInWithPopup($auth, googleProvider)
    storeUserToDatabase()
  } catch (error) {
    Assertions.isFirebaseError(error)
    const code = error.code
    const message = error.message
    const credential = GoogleAuthProvider.credentialFromError(error)
    console.error(`Code: ${code}, Message: ${message}, Credential: ${credential}`)
  }
}

async function storeUserToDatabase() {
  const { error, data, isLoading } = await useFetch({
    url: '/user/signup-with-provider',
    method: 'POST',
    credentials: true,
  })
}
</script>

<template>
  <div class="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
    <div class="px-4 py-8 sm:px-10">
      <div>
        <p class="text-sm font-medium text-gray-700">Sign in with</p>

        <div class="mt-1 grid grid-cols-3 gap-3">
          <div>
            <a
              href="#"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span class="sr-only">Sign in with Facebook</span>
              <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>

          <div>
            <a
              href="javascript:;"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              @click="signInWithGoogle"
            >
              <span class="sr-only">Sign in with Google</span>
              <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 210 210">
                <path
                  d="M0,105C0,47.103,47.103,0,105,0c23.383,0,45.515,7.523,64.004,21.756l-24.4,31.696C133.172,44.652,119.477,40,105,40
	c-35.841,0-65,29.159-65,65s29.159,65,65,65c28.867,0,53.398-18.913,61.852-45H105V85h105v20c0,57.897-47.103,105-105,105
	S0,162.897,0,105z"
                />
              </svg>
            </a>
          </div>

          <div>
            <a
              href="#"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span class="sr-only">Sign in with Apple</span>
              <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 512.003 512.003">
                <g>
                  <g>
                    <path
                      d="M351.98,0c-27.296,1.888-59.2,19.36-77.792,42.112c-16.96,20.64-30.912,51.296-25.472,81.088
			c29.824,0.928,60.64-16.96,78.496-40.096C343.916,61.568,356.556,31.104,351.98,0z"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      d="M459.852,171.776c-26.208-32.864-63.04-51.936-97.824-51.936c-45.92,0-65.344,21.984-97.248,21.984
			c-32.896,0-57.888-21.92-97.6-21.92c-39.008,0-80.544,23.84-106.88,64.608c-37.024,57.408-30.688,165.344,29.312,257.28
			c21.472,32.896,50.144,69.888,87.648,70.208c33.376,0.32,42.784-21.408,88-21.632c45.216-0.256,53.792,21.92,87.104,21.568
			c37.536-0.288,67.776-41.28,89.248-74.176c15.392-23.584,21.12-35.456,33.056-62.08
			C387.852,342.624,373.932,219.168,459.852,171.776z"
                    />
                  </g>
                </g>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="mt-6 relative">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-gray-300" />
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-white text-gray-500"> Or </span>
        </div>
      </div>

      <div class="mt-6">
        <form action="#" method="POST" class="space-y-6">
          <div>
            <label for="name" class="sr-only">Full name</label>
            <input
              id="name"
              type="text"
              name="name"
              autocomplete="name"
              placeholder="Full name"
              required="true"
              class="block w-full shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label for="mobile-or-email" class="sr-only">Mobile number or email</label>
            <input
              id="mobile-or-email"
              type="text"
              name="mobile-or-email"
              autocomplete="email"
              placeholder="Mobile number or email"
              required="true"
              class="block w-full shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              autocomplete="current-password"
              required="true"
              class="block w-full shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Create your account
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="px-4 py-6 bg-white border-t-2 border-gray-200 sm:px-10">
      <p class="text-xs leading-5 text-gray-500">
        By signing up, you agree to our
        <a href="#" class="font-medium text-gray-900 hover:underline">Terms</a>,
        <a href="#" class="font-medium text-gray-900 hover:underline">Data Policy</a> and
        <a href="#" class="font-medium text-gray-900 hover:underline">Cookies Policy</a>.
      </p>
    </div>
  </div>
</template>

<style scoped></style>
