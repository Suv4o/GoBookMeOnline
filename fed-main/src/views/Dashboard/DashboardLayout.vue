<script lang="ts">
export default {
  name: 'DashboardLayout',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useAuthStore } from '../../store/auth'
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
} from '@heroicons/vue/24/outline'

const navigation = [
  { name: 'Scheduler', href: '#', icon: CalendarDaysIcon, current: true },
  { name: 'Resources', href: '#', icon: SquaresPlusIcon, current: false },
  { name: 'Locations', href: '#', icon: MapPinIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
  { name: 'Profile', href: '#', icon: UserCircleIcon, current: false },
  { name: 'My Bookings', href: '#', icon: ListBulletIcon, current: false },
  { name: 'Settings', href: '#', icon: Cog8ToothIcon, current: false },
]

const sidebarOpen = ref(false)
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
                  <a
                    v-for="item in navigation"
                    :key="item.name"
                    :href="item.href"
                    :class="[
                      item.current ? 'bg-teal-700' : 'hover:bg-teal-500',
                      'text-white group flex items-center px-2 py-2 text-base font-medium rounded-md',
                    ]"
                  >
                    <component :is="item.icon" class="text-white mr-4 flex-shrink-0 h-6 w-6" aria-hidden="true" />
                    {{ item.name }}
                  </a>
                </nav>
              </div>
              <div class="flex flex-shrink-0 bg-teal-700 p-4">
                <a href="#" class="group block flex-shrink-0">
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
                      <p class="text-sm font-medium text-gray-400 group-hover:text-gray-300">View profile</p>
                    </div>
                  </div>
                </a>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="w-14 flex-shrink-0">
            <!-- Force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex min-h-0 flex-1 flex-col bg-teal-600">
        <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <router-link :to="{ name: 'home' }" class="flex flex-shrink-0 items-center px-4 cursor-pointer">
            <img class="h-8 w-auto" src="../../assets/images/logo-white.svg" alt="GoBookMe.today" />
            <p class="sm:ml-4 ml-2 sm:text-lg font-semibold text-white">GoBookMe.Today</p>
          </router-link>
          <nav class="mt-5 flex-1 space-y-1 px-2">
            <a
              v-for="item in navigation"
              :key="item.name"
              :href="item.href"
              :class="[
                item.current ? 'bg-teal-700 ' : 'hover:bg-teal-500',
                'text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md',
              ]"
            >
              <component :is="item.icon" class="text-white mr-3 flex-shrink-0 h-6 w-6" aria-hidden="true" />
              {{ item.name }}
            </a>
          </nav>
        </div>
        <div class="flex flex-shrink-0 bg-teal-700 p-4">
          <a href="#" class="group block w-full flex-shrink-0">
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
                <p class="text-xs font-medium text-gray-300 group-hover:text-gray-200">View profile</p>
              </div>
            </div>
          </a>
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
      <main class="flex-1">
        <div class="py-6">
          <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
          </div>
          <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <!-- Replace with your content -->
            <div class="py-4">
              <div class="h-96 rounded-lg border-4 border-dashed border-gray-200" />
            </div>
            <!-- /End replace -->
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
