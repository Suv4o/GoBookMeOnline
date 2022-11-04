<script lang="ts">
export default {
  name: 'DefaultMainNav',
}
</script>

<script setup lang="ts">
import { Auth, signOut } from 'firebase/auth'
import { Popover, PopoverButton, PopoverPanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '../../../store/auth'
import useState from './useState'
import { inject } from 'vue'
import { Assertions } from '../../../types/guards'
import { useNotification } from '../../../utils/composables/notification'
import { NotificationTypes } from '../../../store/notification'
import { parseFirebaseError } from '../../../utils/helpers'
import SignupDropDownButton from './SignupDropDownButton.vue'
import { Roles } from '../../../types/enums'

const $auth = inject('$auth') as Auth
const { isSignInButtonShown, isSignUpButtonShown, setRoleType } = useState()

const signupOptions = [
  {
    name: 'Sign up for free',
    description: 'Find and organise your next booking online.',
    href: 'signup',
    roleType: Roles.USER_DEFAULT,
  },
  {
    name: 'Become a provider',
    description: 'Host your business online and get more bookings.',
    href: 'pricing-provider',
    roleType: Roles.PROVIDER_DEFAULT,
  },
]

async function signUserOut() {
  try {
    await signOut($auth)
  } catch (error) {
    Assertions.isError(error)
    const readableError = parseFirebaseError(error.message)
    if (readableError) {
      useNotification({ type: NotificationTypes.Error, title: 'Error', message: readableError })
    } else {
      useNotification({ type: NotificationTypes.Error, title: error.name, message: error.message })
    }
  }
}
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
                data-testid="Open menu"
                class="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
              >
                <span class="sr-only">Open main menu</span>
                <Bars3Icon class="h-6 w-6" aria-hidden="true" />
              </PopoverButton>
            </div>
          </div>
        </div>
        <div
          v-if="useAuthStore().isUserReady"
          class="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0"
        >
          <Menu
            v-if="isSignInButtonShown && useAuthStore().user && useAuthStore().userInitials"
            as="div"
            class="ml-3 relative"
          >
            <div>
              <MenuButton
                class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                <span class="sr-only">Open user menu</span>
                <span class="inline-flex items-center justify-center h-12 w-12 rounded-full bg-teal-600">
                  <span data-testid="User Initials Desktop" class="text-lg font-medium leading-none text-white">{{
                    useAuthStore().userInitials
                  }}</span>
                </span>
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                    >Your Profile</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                    >Settings</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    data-testid="Sign out"
                    href="javascript:;"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                    @click="signUserOut"
                    >Sign Out</a
                  >
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
          <span v-else class="inline-flex rounded-md">
            <router-link
              v-if="isSignInButtonShown"
              data-testid="Sign in"
              :to="{ name: 'signin' }"
              class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-teal-600 bg-white hover:bg-gray-50 shadow"
            >
              Sign in
            </router-link>
            <SignupDropDownButton v-if="isSignUpButtonShown" :signup-options="signupOptions" />
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
                data-testid="Close menu"
                class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
              >
                <span class="sr-only">Close menu</span>
                <XMarkIcon class="h-6 w-6" aria-hidden="true" />
              </PopoverButton>
            </div>
          </div>
          <div v-if="useAuthStore().isUserReady" class="px-5">
            <div v-if="isSignInButtonShown && useAuthStore().user && useAuthStore().userInitials" class="pb-4">
              <span class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-teal-600 ml-3">
                <span data-testid="User Initials Mobile" class="text-lg font-medium leading-none text-white">{{
                  useAuthStore().userInitials
                }}</span>
              </span>
              <div class="space-y-1 mt-4" aria-label="Sidebar">
                <a
                  href="#"
                  class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center px-3 py-2 text-md font-medium rounded-md"
                >
                  <span class="truncate">Your Profile</span>
                </a>
                <a
                  href="#"
                  class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center px-3 py-2 text-md font-medium rounded-md"
                >
                  <span class="truncate">Settings</span>
                </a>
                <a
                  href="javascript:;"
                  class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center px-3 py-2 text-md font-medium rounded-md"
                  @click="signUserOut"
                >
                  <span class="truncate">Sign Out</span>
                </a>
              </div>
            </div>
            <template v-else>
              <router-link
                :to="{ name: 'signup' }"
                class="block w-full px-5 py-3 text-center font-medium text-white bg-teal-600 hover:bg-teal-700"
                @click="setRoleType(Roles.USER_DEFAULT)"
              >
                Sign up for free
              </router-link>
              <router-link
                :to="{ name: 'pricing-provider' }"
                class="block w-full px-5 py-3 text-center font-medium text-teal-600 bg-white hover:bg-gray-50 shadow my-2"
              >
                Become a provider
              </router-link>
              <p class="my-4 text-center text-base font-medium text-gray-500">
                Existing customer?
                <router-link data-testid="Sign in" :to="{ name: 'signin' }" class="text-teal-600 hover:text-teal-500">
                  Sign in
                </router-link>
              </p>
            </template>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>
