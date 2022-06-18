<script lang="ts">
export default {
  name: 'HeroSection',
}
</script>

<script setup lang="ts">
import { Auth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { inject, onMounted, ref } from 'vue'
import { NotificationTypes } from '../../store/notification'
import { Assertions } from '../../types/guards'
import { useNotification } from '../../utils/composables/notiofication'
// import { useFetch } from '../../utils/composables/fetch'
// import { parseErrorMessage } from '../../utils/helpers'
import useState from './useState'

const { fullName, phoneNumber } = useState()
const $auth = inject('$auth') as Auth

const verificationCode = ref('')
const isProcessing = ref(false)

onMounted(async () => {
  try {
    const confirmationResult = await sendVerificationCode()
  } catch (error) {
    isProcessing.value = false
    Assertions.isError(error)
    useNotification({ type: NotificationTypes.Error, title: error.name, message: error.message })
  }
})

async function sendVerificationCode() {
  try {
    $auth.languageCode = 'en'

    const recaptchaVerifier = new RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
      },
      $auth
    )

    return signInWithPhoneNumber($auth, phoneNumber.value, recaptchaVerifier)
  } catch (error) {
    Assertions.isError(error)
    throw new Error('Error sending SMS', error)
  }
}

async function submitVerificationCode() {
  console.log('Submit!')
}

// async function sendVerificationEmailLink() {
//   try {
//     const { data, error } = await useFetch({
//       url: '/user/email-verification',
//       method: 'GET',
//     })

//     if (error.value) {
//       throw new Error(parseErrorMessage(error.value.message))
//     }
//   } catch (error) {
//     Assertions.isError(error)
//     throw new Error(error.message)
//   }
// }
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
            <form class="space-y-6" @submit="submitVerificationCode">
              <div class="sm:w-96">
                <label for="verificationCode" class="sr-only">Verification Code</label>
                <input
                  id="verificationCode"
                  v-model="verificationCode"
                  :disabled="isProcessing"
                  type="text"
                  name="verificationCode"
                  autocomplete="verificationCode"
                  placeholder="Verification Code"
                  required="true"
                  class="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </form>
            <a
              class="block w-full py-3 px-5 text-center bg-white border border-transparent rounded-md shadow-md text-base font-medium text-teal-700 hover:bg-gray-50 sm:inline-block sm:w-auto"
              href="javascript:;"
              @click="sendVerificationCode"
              >Resend a Verification Code</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="sign-in-button"></div>
</template>
