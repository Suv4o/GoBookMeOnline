<script lang="ts">
export default {
  name: 'SigninForm',
}
</script>

<script setup lang="ts">
import { Auth } from '@firebase/auth'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { inject, ref, reactive } from 'vue'
import router from '../../router'
import { useAuthStore } from '../../store/auth'
import { NotificationTypes } from '../../store/notification'
import { Roles } from '../../types/enums'
import { Assertions } from '../../types/guards'
import { useFetch } from '../../utils/composables/fetch'
import { useNotification } from '../../utils/composables/notification'
import { ResponseValidator, useValidator } from '../../utils/composables/validator'
import { parseErrorMessage, parseFirebaseError } from '../../utils/helpers'
import useState from '../PhoneVerificationPage/useState'
import { CurrentUserDetails } from '../SignupPage/SignupForm.vue'

const $auth = inject('$auth') as Auth
const useAuthState = useAuthStore()
const googleProvider = new GoogleAuthProvider()

const phoneOrEmail = ref('')
const isProcessing = ref(false)

const isValid = reactive({
  phoneOrEmail: { valid: true, message: '' },
} as Pick<ResponseValidator, 'phoneOrEmail'>)

async function signInWithEmail() {
  try {
    const { error } = await useFetch({
      url: '/user/signin-email',
      method: 'POST',
      body: {
        email: phoneOrEmail.value,
      },
      credentials: false,
    })

    if (error.value) {
      throw new Error(parseErrorMessage(error.value.message))
    }
  } catch (error) {
    Assertions.isError(error)
    throw new Error(error.message)
  }
}

async function signInWithPhone() {
  try {
    const { error, data } = await useFetch({
      url: '/user/signin-phone',
      method: 'POST',
      body: {
        phoneNumber: phoneOrEmail.value,
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

    return user
  } catch (error) {
    Assertions.isError(error)
    throw new Error(error.message)
  }
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

async function storeUserToDatabase() {
  try {
    const { error, data } = await useFetch({
      url: '/user/signup-with-provider',
      method: 'POST',
      body: {
        role: Roles.USER_DEFAULT,
      },
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

function clearInputs() {
  phoneOrEmail.value = ''
}

async function signInUser(event: Event) {
  event.preventDefault()

  const { validProps } = useValidator({
    phoneOrEmail: phoneOrEmail.value,
  })

  isValid.phoneOrEmail = validProps.phoneOrEmail

  if (!validProps.phoneOrEmail.valid) {
    phoneOrEmail.value = ''
  }

  if (validProps.phoneOrEmail.valid) {
    if (!validProps.phoneOrEmail.isMobile) {
      try {
        isProcessing.value = true
        useAuthState.isUserAuthCompleted = false
        await signInWithEmail()
        clearInputs()
        useNotification({
          type: NotificationTypes.Success,
          title: 'Email has been sent',
          message: 'Please check your email and click the link to sign in.',
        })
        isProcessing.value = false
        useAuthState.isUserAuthCompleted = true
      } catch (error) {
        isProcessing.value = false
        useAuthState.isUserAuthCompleted = true
        Assertions.isError(error)
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
        const { displayName, phoneNumber } = await signInWithPhone()
        const { setFullName, setPhoneNumber } = useState()
        setFullName(displayName)
        setPhoneNumber(phoneNumber)
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
  <div class="mx-auto w-full max-w-sm lg:w-96">
    <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>

    <div class="mt-8">
      <div>
        <div>
          <p class="text-sm font-medium text-gray-700">Sign in with Google</p>

          <div class="mt-1 grid grid-cols-1 gap-3">
            <div>
              <a
                href="javascript:;"
                data-testid="Sign in with Google"
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
            <span class="px-2 bg-gray-50 text-gray-500"> Or continue with </span>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <form class="space-y-6" data-testid="Sign in a user" @submit="signInUser">
          <div>
            <label for="mobile-or-email" class="block text-sm font-medium text-gray-700">
              Mobile Number or Email
            </label>
            <div class="mt-1">
              <input
                id="mobile-or-email"
                v-model="phoneOrEmail"
                data-testid="Phone or Email"
                :disabled="isProcessing"
                name="mobile-or-email"
                type="text"
                autocomplete="email|tel"
                required="true"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
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
          </div>

          <div>
            <button
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
              {{ isProcessing ? 'Signing in...' : 'Sign in' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
