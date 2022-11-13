<script lang="ts">
export default {
  name: 'DashboardLayout',
}
</script>

<script setup lang="ts">
import { ref, watch, onBeforeMount, inject } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { uniqKey } from '../../utils/helpers'
import { useAuthStore } from '../../store/auth'
import { RouteRecordName, useRoute } from 'vue-router'
import { Auth, signOut } from 'firebase/auth'
import { Assertions } from '../../types/guards'
import { useNotification } from '../../utils/composables/notification'
import { parseFirebaseError } from '../../utils/helpers'
import { NotificationTypes } from '../../store/notification'
import {
  Bars3Icon,
  CalendarDaysIcon,
  SquaresPlusIcon,
  MapPinIcon,
  ChartBarIcon,
  UserCircleIcon,
  ListBulletIcon,
  XMarkIcon,
  Cog8ToothIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/vue/24/outline'

const navigation = [
  { name: 'Scheduler', href: 'scheduler', icon: CalendarDaysIcon, current: false },
  { name: 'Resources', href: 'resources', icon: SquaresPlusIcon, current: false },
  { name: 'Locations', href: 'locations', icon: MapPinIcon, current: false },
  { name: 'Reports', href: 'reports', icon: ChartBarIcon, current: false },
  { name: 'Profile', href: 'profile', icon: UserCircleIcon, current: false },
  { name: 'My Bookings', href: 'my-bookings', icon: ListBulletIcon, current: false },
  { name: 'Settings', href: 'settings', icon: Cog8ToothIcon, current: false },
]

const sidebarOpen = ref(false)
const route = useRoute()
const $auth = inject('$auth') as Auth

onBeforeMount(() => {
  if (route.name) {
    updateCurrentNavigation(route.name)
  }
})

watch(
  () => route.name,
  routerName => {
    if (routerName) {
      updateCurrentNavigation(routerName)
    }
  }
)

function updateCurrentNavigation(routeName: RouteRecordName) {
  navigation.map(item => {
    return (item.current = item.href === routeName)
  })
}

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
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-40 md:hidden" @close="sidebarOpen = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-teal-600">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                <router-link :to="{ name: 'home' }" class="flex flex-shrink-0 items-center px-4 cursor-pointer">
                  <img class="h-8 w-auto" src="../../assets/images/logo-white.svg" alt="GoBookMe.today" />
                  <p class="sm:ml-4 ml-2 sm:text-lg font-semibold text-white">GoBookMe.Today</p>
                </router-link>
                <nav class="mt-5 space-y-1 px-2">
                  <router-link
                    v-for="item in navigation"
                    :key="item.name"
                    :to="{ name: item.href }"
                    :class="[
                      item.current ? 'bg-teal-700' : 'hover:bg-teal-500',
                      'text-white group flex items-center px-2 py-2 text-base font-medium rounded-md',
                    ]"
                  >
                    <component :is="item.icon" class="text-white mr-4 flex-shrink-0 h-6 w-6" aria-hidden="true" />
                    {{ item.name }}
                  </router-link>
                  <hr class="border-t border-gray-300" aria-hidden="true" />
                  <a
                    href="javascript:;"
                    class="bg-teal-600 hover:bg-teal-500 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    @click="signUserOut"
                  >
                    <component
                      :is="ArrowLeftOnRectangleIcon"
                      class="text-white mr-3 flex-shrink-0 h-6 w-6"
                      aria-hidden="true"
                    />
                    Sign out
                  </a>
                </nav>
              </div>
              <div class="flex flex-shrink-0 bg-teal-700 p-4">
                <div class="group block flex-shrink-0">
                  <div class="flex items-center">
                    <div>
                      <span class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-teal-600 ml-3">
                        <span data-testid="User Initials Mobile" class="text-lg font-medium leading-none text-white">{{
                          useAuthStore().userInitials
                        }}</span>
                      </span>
                    </div>
                    <div class="ml-3">
                      <p class="text-base font-medium text-white">{{ useAuthStore().userFullName }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="w-14 flex-shrink-0"></div>
        </div>
      </Dialog>
    </TransitionRoot>

    <div class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      <div class="flex min-h-0 flex-1 flex-col bg-teal-600">
        <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <router-link :to="{ name: 'home' }" class="flex flex-shrink-0 items-center px-4 cursor-pointer">
            <img class="h-8 w-auto" src="../../assets/images/logo-white.svg" alt="GoBookMe.today" />
            <p class="sm:ml-4 ml-2 sm:text-lg font-semibold text-white">GoBookMe.Today</p>
          </router-link>
          <nav class="mt-5 flex-1 space-y-1 px-2">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="{ name: item.href }"
              :class="[
                item.current ? 'bg-teal-700 ' : 'hover:bg-teal-500',
                'text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md',
              ]"
            >
              <component :is="item.icon" class="text-white mr-3 flex-shrink-0 h-6 w-6" aria-hidden="true" />
              {{ item.name }}
            </router-link>
            <hr class="border-t border-gray-300" aria-hidden="true" />
            <a
              href="javascript:;"
              class="bg-teal-600 hover:bg-teal-500 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              @click="signUserOut"
            >
              <component
                :is="ArrowLeftOnRectangleIcon"
                class="text-white mr-3 flex-shrink-0 h-6 w-6"
                aria-hidden="true"
              />
              Sign out
            </a>
          </nav>
        </div>
        <div class="flex flex-shrink-0 bg-teal-700 p-4">
          <div class="group block w-full flex-shrink-0">
            <div class="flex items-center">
              <div>
                <span class="inline-flex items-center justify-center h-9 w-9 rounded-full bg-teal-600 ml-3">
                  <span data-testid="User Initials Mobile" class="text-lg font-medium leading-none text-white">
                    {{ useAuthStore().userInitials }}</span
                  >
                </span>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-white">{{ useAuthStore().userFullName }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-1 flex-col md:pl-64">
      <div class="sticky top-0 z-10 bg-teal-600 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
        <button
          type="button"
          class="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="flex-1">
        <div class="py-6">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <div :key="uniqKey()">
                <component :is="Component" />
              </div>
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>
