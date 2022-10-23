<script lang="ts">
export default {
  name: 'DefaultNotification',
}
</script>

<script setup lang="ts">
import { NotificationTypes } from '../../../store/notification'
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { useNotificationStore } from '../../../store/notification'

const notificationStore = useNotificationStore()

function close() {
  notificationStore.isOpen = false
}
</script>

<template>
  <div
    aria-live="assertive"
    class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-30"
  >
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="notificationStore.isOpen"
          data-testid="Default Notification"
          class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div data-testid="Notification icon" class="flex-shrink-0">
                <CheckCircleIcon
                  v-if="notificationStore.type === NotificationTypes.Success"
                  class="h-6 w-6 text-green-400"
                  aria-hidden="true"
                />
                <XCircleIcon
                  v-if="notificationStore.type === NotificationTypes.Error"
                  class="h-6 w-6 text-red-400"
                  aria-hidden="true"
                />
                <ExclamationTriangleIcon
                  v-if="notificationStore.type === NotificationTypes.Warning"
                  class="h-6 w-6 text-yellow-400"
                  aria-hidden="true"
                />
                <InformationCircleIcon
                  v-if="notificationStore.type === NotificationTypes.Info"
                  class="h-6 w-6 text-blue-400"
                  aria-hidden="true"
                />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p data-testid="Notification title" class="text-sm font-medium text-gray-900">
                  {{ notificationStore.title }}
                </p>
                <p data-testid="Notification message" class="mt-1 text-sm text-gray-500">
                  {{ notificationStore.message }}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  type="button"
                  class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  @click="close"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
