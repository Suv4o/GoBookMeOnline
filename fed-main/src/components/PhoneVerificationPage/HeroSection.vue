<script lang="ts">
export default {
  name: 'HeroSection',
}
</script>

<script setup lang="ts">
import { Auth, ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { inject, onMounted, ref, computed, watch } from 'vue'
import router from '../../router'
import { NotificationTypes } from '../../store/notification'
import { Assertions } from '../../types/guards'
import { useFetch } from '../../utils/composables/fetch'
import { useNotification } from '../../utils/composables/notification'
import { parseErrorMessage, splitFullName, parseFirebaseError } from '../../utils/helpers'
import { CurrentUserDetails } from '../SignupPage/SignupForm.vue'
import { useAuthStore } from '../../store/auth'
import useState from './useState'
import { AuthStateUser } from '../../types/interfaces'

const { fullName, phoneNumber, setFullName, setPhoneNumber } = useState()
const $auth = inject('$auth') as Auth
const useAuthState = useAuthStore()

const verificationCode = ref('')
const isProcessing = ref(false)
let recaptchaVerifier: RecaptchaVerifier | null = null
const confirmation = {
  result: null as ConfirmationResult | null,
}

onMounted(async () => {
  await setVerificationCode()
})

const isVerificationCodeEntered = computed(() => {
  if (verificationCode.value.length === 6) return true
  return false
})

watch(
  () => isVerificationCodeEntered.value,
  isEntered => {
    if (isEntered) {
      submitVerificationCode()
    }
  }
)

async function setVerificationCode() {
  try {
    confirmation.result = await sendVerificationCode()
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
}

async function sendVerificationCode() {
  try {
    $auth.languageCode = 'en'

    if (!recaptchaVerifier) {
      recaptchaVerifier = new RecaptchaVerifier(
        'sign-in-button',
        {
          size: 'invisible',
        },
        $auth
      )
    }

    useNotification({
      type: NotificationTypes.Success,
      title: 'Send',
      message: 'A verification code has been sent to your mobile number.',
    })
    return signInWithPhoneNumber($auth, phoneNumber.value, recaptchaVerifier)
  } catch (error) {
    isProcessing.value = false
    useAuthState.isUserAuthCompleted = true
    Assertions.isError(error)
    throw new Error('Error sending SMS', error)
  }
}

async function submitVerificationCode() {
  try {
    if (confirmation.result) {
      isProcessing.value = true
      useAuthState.isUserAuthCompleted = false
      await confirmation.result.confirm(verificationCode.value)
      const result = await signUpWithPhone()

      const user: AuthStateUser = {
        displayName: result.displayName,
        email: null,
        emailVerified: result.emailVerified,
        firstName: result.firstName,
        lastName: result.lastName,
        phoneNumber: result.phoneNumber,
        photoURL: null,
        role: result.role,
        uid: result.uid,
      }
      useAuthState.user = user

      router.push({ name: 'home', query: { 'successfully-signed': 'true' } })
      clearInputs()
      isProcessing.value = false
      useAuthState.isUserAuthCompleted = true
    }
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
}

async function signUpWithPhone() {
  try {
    const { firstName, lastName } = splitFullName(fullName.value)
    const { error, data } = await useFetch({
      url: '/user/signup-phone',
      method: 'POST',
      body: {
        firstName,
        lastName,
      },
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
  verificationCode.value = ''
  setFullName('')
  setPhoneNumber('')
}
</script>
<template>
  <div class="relative pt-28 pb-16 bg-white z-0">
    <div class="hidden absolute top-0 inset-x-0 h-1/2 bg-gray-50 lg:block" aria-hidden="true" />
    <div class="max-w-7xl mx-auto bg-teal-600 lg:bg-transparent lg:px-8">
      <div class="lg:grid lg:grid-cols-12">
        <div class="relative z-10 lg:col-start-1 lg:row-start-1 lg:col-span-4 lg:py-16 lg:bg-transparent">
          <div class="absolute inset-x-0 h-1/2 bg-gray-50 lg:hidden" aria-hidden="true" />
          <div class="max-w-md mx-auto px-4 sm:max-w-3xl sm:px-10 lg:max-w-none lg:p-0">
            <div class="aspect-w-10 aspect-h-6 sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1">
              <img
                class="object-cover object-center rounded-3xl shadow-2xl"
                src="../../assets/images/hero/phone-verification.jpg"
                alt=""
              />
            </div>
          </div>
        </div>

        <div
          class="relative bg-teal-600 lg:col-start-3 lg:row-start-1 lg:col-span-10 lg:rounded-3xl lg:grid lg:grid-cols-10 lg:items-center"
        >
          <div class="hidden absolute inset-0 overflow-hidden rounded-3xl lg:block" aria-hidden="true">
            <svg
              class="absolute bottom-full left-full transform translate-y-1/3 -translate-x-2/3 xl:bottom-auto xl:top-0 xl:translate-y-0"
              width="404"
              height="384"
              fill="none"
              viewBox="0 0 404 384"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect x="0" y="0" width="4" height="4" class="text-teal-800" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="384" fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
            </svg>
            <svg
              class="absolute top-full transform -translate-y-1/3 -translate-x-1/3 xl:-translate-y-1/2"
              width="404"
              height="384"
              fill="none"
              viewBox="0 0 404 384"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect x="0" y="0" width="4" height="4" class="text-teal-500" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="384" fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
            </svg>
          </div>
          <div
            class="relative max-w-md mx-auto py-12 px-4 space-y-6 sm:max-w-3xl sm:py-16 sm:px-10 lg:max-w-none lg:p-0 lg:col-start-4 lg:col-span-6"
          >
            <h2 id="join-heading" class="text-4xl font-extrabold text-white">Phone Verification</h2>
            <p class="text-xl text-white">
              A verification code has been sent to your phone. Please enter your code in the input field.
            </p>
            <div class="space-y-6">
              <div class="sm:w-96 relative">
                <label for="verificationCode" class="sr-only">Verification Code</label>
                <input
                  id="verificationCode"
                  v-model="verificationCode"
                  :disabled="isProcessing"
                  type="text"
                  maxlength="6"
                  name="verificationCode"
                  autocomplete="verificationCode"
                  placeholder="Verification Code"
                  required="true"
                  class="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                />
                <div v-if="isProcessing" class="absolute top-1 -right-1 z-10">
                  <svg
                    class="animate-spin -ml-1 mr-3 h-7 w-7 text-teal-600"
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
                </div>
              </div>
            </div>
            <a
              :class="`${isProcessing ? 'pointer-events-none' : ''}`"
              class="block w-full py-3 px-5 text-center bg-white border border-transparent rounded-md shadow-md text-base font-medium text-teal-700 hover:bg-gray-50 sm:inline-block sm:w-auto"
              href="javascript:;"
              data-testid="Send Phone Verification Code"
              @click="sendVerificationCode"
              >Resend a Verification Code</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="sign-in-button" class="opacity-0"></div>
</template>
