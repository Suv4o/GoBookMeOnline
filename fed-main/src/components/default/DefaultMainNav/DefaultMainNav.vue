<script lang="ts">
export default {
  name: 'DefaultMainNav',
}
</script>
<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { MenuIcon, XIcon } from '@heroicons/vue/outline'
import useState from './useState'

const { isSignInButtonShown, isSignUpButtonShown } = useState()
</script>

<template>
  <Popover>
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <nav class="relative flex items-center justify-between sm:h-10 md:justify-center" aria-label="Global">
        <div class="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
          <div class="flex items-center justify-between w-full md:w-auto">
            <router-link :to="{ name: 'home' }" class="text-gray-500 hover:text-gray-600">
              <span class="sr-only">Go Book Me Online</span>
              <div class="flex items-center">
                <img class="h-8 w-auto sm:h-10" src="../../../assets/images/logo.svg" alt="" />
                <p class="sm:ml-4 ml-2 sm:text-lg font-semibold">GoBookMe.Today</p>
              </div>
            </router-link>
            <div class="-mr-2 flex items-center md:hidden">
              <PopoverButton
                class="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
              >
                <span class="sr-only">Open main menu</span>
                <MenuIcon class="h-6 w-6" aria-hidden="true" />
              </PopoverButton>
            </div>
          </div>
        </div>
        <div class="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
          <span class="inline-flex rounded-md">
            <router-link
              v-if="isSignInButtonShown"
              :to="{ name: 'signin' }"
              class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-teal-600 bg-white hover:bg-gray-50 shadow"
            >
              Sign in
            </router-link>
            <router-link
              v-if="isSignUpButtonShown"
              :to="{ name: 'signup' }"
              class="inline-flex items-center px-4 py-2 ml-4 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 shadow"
            >
              Sign up
            </router-link>
          </span>
        </div>
      </nav>
    </div>

    <transition
      enter-active-class="duration-150 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <PopoverPanel focus class="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
        <div class="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div class="px-5 pt-4 mb-4 flex items-center justify-between">
            <div class="flex items-center">
              <img class="h-8 w-auto" src="../../../assets/images/logo.svg" alt="" />
              <p class="ml-2 font-semibold">GoBookMe.Today</p>
            </div>
            <div class="-mr-2">
              <PopoverButton
                class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
              >
                <span class="sr-only">Close menu</span>
                <XIcon class="h-6 w-6" aria-hidden="true" />
              </PopoverButton>
            </div>
          </div>
          <router-link
            :to="{ name: 'signup' }"
            class="block w-full px-5 py-3 text-center font-medium text-white bg-teal-600 hover:bg-teal-700"
          >
            Sign up
          </router-link>
          <p class="my-4 text-center text-base font-medium text-gray-500">
            Existing customer?
            <router-link :to="{ name: 'signin' }" class="text-teal-600 hover:text-teal-500"> Sign in </router-link>
          </p>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>
