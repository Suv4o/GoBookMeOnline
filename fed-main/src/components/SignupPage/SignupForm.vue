<script lang="ts">
export default {
  name: 'SignupForm',
}
</script>

<script setup lang="ts">
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { Auth, signInWithCustomToken } from '@firebase/auth'
import { Assertions } from '../../types/guards'
import { inject, reactive, ref } from 'vue'
import { useAuthStore } from '../../store/auth'
import { useFetch } from '../../utils/composables/fetch'
import { ResponseValidator, useValidator } from '../../utils/composables/validator'
import { parseErrorMessage, parseFirebaseError, splitFullName } from '../../utils/helpers'
import router from '../../router'
import { useNotification } from '../../utils/composables/notification'
import { NotificationTypes } from '../../store/notification'
import useState from '../PhoneVerificationPage/useState'

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

const useAuthState = useAuthStore()
const googleProvider = new GoogleAuthProvider()
const $auth = inject('$auth') as Auth

const fullName = ref('')
const phoneOrEmail = ref('')
const isProcessing = ref(false)

const isValid = reactive({
  fullName: { valid: true, message: '' },
  phoneOrEmail: { valid: true, message: '' },
} as Pick<ResponseValidator, 'fullName' | 'phoneOrEmail'>)

async function signUpWithEmail() {
  try {
    const { firstName, lastName } = splitFullName(fullName.value)
    const { error, data } = await useFetch({
      url: '/user/signup-email',
      method: 'POST',
      body: {
        email: phoneOrEmail.value,
        firstName,
        lastName,
      },
      credentials: false,
    })

    if (error.value) {
      throw new Error(parseErrorMessage(error.value.message))
    }

    const user = data.value as CurrentUserDetails | null

    if (!user) {
      throw new Error('This user cannot be created!')
    }

    return user as CurrentUserDetails
  } catch (error) {
    Assertions.isError(error)
    throw new Error(error.message)
  }
}

function clearInputs() {
  fullName.value = ''
  phoneOrEmail.value = ''
}

async function signUpWithGoogle() {
  try {
    await signInWithPopup($auth, googleProvider)
    await storeUserToDatabase()
    router.push({ name: 'home', query: { 'successfully-signed': 'true' } })
  } catch (error) {
    Assertions.isError(error)
    clearInputs()
    const readableError = parseFirebaseError(error.message)
    if (readableError) {
      useNotification({ type: NotificationTypes.Error, title: 'Error', message: readableError })
    } else {
      useNotification({ type: NotificationTypes.Error, title: error.name, message: error.message })
    }
  }
}

async function signInWithToken(customToken = '') {
  try {
    await signInWithCustomToken($auth, customToken)
  } catch (error) {
    Assertions.isFirebaseError(error)
    throw new Error(error.message)
  }
}

async function sendVerificationEmailLink() {
  try {
    const { data, error } = await useFetch({
      url: '/user/email-verification',
      method: 'GET',
    })

    if (error.value) {
      throw new Error(parseErrorMessage(error.value.message))
    }
  } catch (error) {
    Assertions.isError(error)
    throw new Error(error.message)
  }
}

async function storeUserToDatabase() {
  try {
    const { error, data } = await useFetch({
      url: '/user/signup-with-provider',
      method: 'POST',
    })

    if (error.value) {
      throw new Error(parseErrorMessage(error.value.message))
    }

    const user = data.value as CurrentUserDetails | null

    if (!user) {
      throw new Error('This user cannot be created!')
    }

    useAuthState.user = {
      uid: user.uid,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      email: user.email,
      phoneNumber: user.phoneNumber,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    }
  } catch (error) {
    Assertions.isError(error)
    throw new Error(error.message)
  }
}

async function createUser(event: Event) {
  event.preventDefault()

  const { validProps } = useValidator({
    fullName: fullName.value,
    phoneOrEmail: phoneOrEmail.value,
  })

  isValid.fullName = validProps.fullName
  isValid.phoneOrEmail = validProps.phoneOrEmail

  if (!validProps.fullName.valid) {
    fullName.value = ''
  }

  if (!validProps.phoneOrEmail.valid) {
    phoneOrEmail.value = ''
  }

  if (validProps.fullName.valid && validProps.phoneOrEmail.valid) {
    if (!validProps.phoneOrEmail.isMobile) {
      try {
        isProcessing.value = true
        useAuthState.isUserAuthCompleted = false
        const { customToken } = await signUpWithEmail()
        await signInWithToken(customToken)
        await sendVerificationEmailLink()
        clearInputs()
        router.push({ name: 'email-verification' })
        isProcessing.value = false
        useAuthState.isUserAuthCompleted = true
      } catch (error) {
        isProcessing.value = false
        useAuthState.isUserAuthCompleted = true
        Assertions.isError(error)
        clearInputs()
        const readableError = parseFirebaseError(error.message)
        if (readableError) {
          useNotification({ type: NotificationTypes.Error, title: 'Error', message: readableError })
        } else {
          useNotification({ type: NotificationTypes.Error, title: error.name, message: error.message })
        }
      }
    } else {
      try {
        isProcessing.value = true
        useAuthState.isUserAuthCompleted = false
        const { setFullName, setPhoneNumber } = useState()
        setFullName(fullName.value)
        setPhoneNumber(phoneOrEmail.value)
        clearInputs()
        router.push({ name: 'phone-verification' })
        isProcessing.value = false
        useAuthState.isUserAuthCompleted = true
      } catch (error) {
        isProcessing.value = false
        useAuthState.isUserAuthCompleted = true
        Assertions.isError(error)
        clearInputs()
        const readableError = parseFirebaseError(error.message)
        if (readableError) {
          useNotification({ type: NotificationTypes.Error, title: 'Error', message: readableError })
        } else {
          useNotification({ type: NotificationTypes.Error, title: error.name, message: error.message })
        }
      }
    }
  }
}
</script>

<template>
  <div class="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
    <div class="px-4 py-8 sm:px-10">
      <div>
        <p class="text-sm font-medium text-gray-700">Sign up with Google</p>
        <div class="mt-1 grid grid-cols-1 gap-3">
          <div>
            <a
              href="javascript:;"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              @click="signUpWithGoogle"
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
        <form class="space-y-6" @submit="createUser">
          <div>
            <label for="name" class="sr-only">Full Name</label>
            <input
              id="name"
              v-model="fullName"
              :disabled="isProcessing"
              type="text"
              name="name"
              autocomplete="name"
              placeholder="Full Name"
              required="true"
              class="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              :class="`${
                !isValid.fullName.valid ? 'ring-red-700 border-red-700' : 'focus:ring-teal-500 focus:border-teal-500'
              }`"
            />
            <p v-if="!isValid?.fullName?.valid" class="text-sm text-red-700 mt-1">{{ isValid.fullName.message }}</p>
          </div>

          <div>
            <label for="mobile-or-email" class="sr-only">Mobile Number or Email</label>
            <input
              id="mobile-or-email"
              v-model="phoneOrEmail"
              :disabled="isProcessing"
              type="text"
              name="mobile-or-email"
              autocomplete="email|tel"
              placeholder="Mobile Number or Email"
              required="true"
              class="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              :class="`${
                !isValid.phoneOrEmail.valid
                  ? 'ring-red-700 border-red-700'
                  : 'focus:ring-teal-500 focus:border-teal-500'
              }`"
            />
            <p v-if="!isValid.phoneOrEmail.valid" class="text-sm text-red-700 mt-1">
              {{ isValid.phoneOrEmail.message }}
            </p>
          </div>
          <div>
            <button
              :disabled="isProcessing"
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              <svg
                v-if="isProcessing"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ isProcessing ? 'Creating User...' : 'Create your account' }}
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
