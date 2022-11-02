<script lang="ts">
export default {
  name: 'SignupDropDown',
}
</script>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
// import useState from './useState'
import { ref } from 'vue'
import { Roles } from '../../../types/enums'

const button = ref<HTMLButtonElement>()

interface SignupOptions {
  name: string
  description: string
  href: string
  roleType: Roles
}

interface Props {
  signupOptions: SignupOptions[]
}

const props = withDefaults(defineProps<Props>(), {})

// const { setRoleType } = useState()

// function handleSignupOptionClick(roleType: Roles) {
//   setRoleType(roleType)
//   button.value?.click()
// }
</script>

<template>
  <Popover class="relative">
    <PopoverButton as="div">
      <button
        ref="button"
        class="inline-flex items-center px-4 py-2 ml-4 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 shadow"
      >
        Sign up
      </button>
    </PopoverButton>

    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <PopoverPanel class="absolute left-[-48px] z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-2 sm:px-0">
        <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
            <router-link
              v-for="option in props.signupOptions"
              :key="option.name"
              :to="{ name: option.href }"
              class="-m-3 block rounded-md p-3 transition duration-150 ease-in-out hover:bg-gray-50"
              @click="button?.click()"
            >
              <p class="text-base font-medium text-gray-900">{{ option.name }}</p>
              <p class="mt-1 text-sm text-gray-500">{{ option.description }}</p>
            </router-link>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>
