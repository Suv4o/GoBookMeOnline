<script lang="ts">
export default {
  name: 'SigninForm',
}
</script>

<script setup lang="ts">
import { Auth } from '@firebase/auth'
import { inject, ref, reactive } from 'vue'
import router from '../../router'
import { NotificationTypes } from '../../store/notification'
import { Assertions } from '../../types/guards'
import { useFetch } from '../../utils/composables/fetch'
import { useNotification } from '../../utils/composables/notiofication'
import { ResponseValidator, useValidator } from '../../utils/composables/validator'
import { parseErrorMessage, parseFirebaseError } from '../../utils/helpers'

const $auth = inject('$auth') as Auth

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
        await signInWithEmail()
        clearInputs()
        useNotification({
          type: NotificationTypes.Success,
          title: 'Email has been sent',
          message: 'Please check your email and click the link to sign in.',
        })
        isProcessing.value = false
      } catch (error) {
        isProcessing.value = false
        Assertions.isError(error)
        const readableError = parseFirebaseError(error.message)
        if (readableError) {
          useNotification({ type: NotificationTypes.Error, title: 'Error', message: readableError })
        } else {
          useNotification({ type: NotificationTypes.Error, title: error.name, message: error.message })
        }
      }
    } else {
      console.log('sign in with phone')
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
                href="#"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
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
            <span class="px-2 bg-gray-50 text-gray-500"> Or continue with </span>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <form class="space-y-6" @submit="signInUser">
          <div>
            <label for="mobile-or-email" class="block text-sm font-medium text-gray-700">
              Mobile Number or Email
            </label>
            <div class="mt-1">
              <input
                id="mobile-or-email"
                v-model="phoneOrEmail"
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
