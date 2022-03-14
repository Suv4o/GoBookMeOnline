<script lang="ts">
export default {
  name: 'BookSearchList',
}
</script>

<script setup lang="ts">
import { CheckCircleIcon, XCircleIcon, ChevronRightIcon } from '@heroicons/vue/solid'

interface Props {
  title: string
  type: 'person' | 'location'
}

const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  type: undefined,
})

function textTimeAvailability(isAvailable: boolean) {
  if (props.type === 'location' && isAvailable) {
    return 'Opens at'
  }
  if (props.type === 'location' && !isAvailable) {
    return 'Closes at'
  }
  if (props.type === 'person' && isAvailable) {
    return 'Available at'
  }
  if (props.type === 'person' && !isAvailable) {
    return 'Next Available at'
  }
}

// const result = [
//   {
//     name: 'Ricardo Cooper',
//     isAvailable: true,
//     status: 'Available',
//     time: '8:00am',
//     avatarUrl:
//       'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     address: '96 Bass Street, Bungabbee, New South Wales, Australia',
//     type: 'Hairdresser',
//     href: '/',
//   },
//   {
//     name: 'Kristen Ramos',
//     isAvailable: true,
//     status: 'Available',
//     time: '9:00am',
//     avatarUrl:
//       'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     address: '56 Larissa Court, Neds Corner, Victoria, Australia',
//     type: 'Holiday Park',
//     href: '/',
//   },
//   {
//     name: 'Ted Fox',
//     isAvailable: false,
//     status: 'Not Available',
//     time: '7:00pm',
//     avatarUrl:
//       'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     address: '50 McPherson Road, Tallangatta, Victoria, Australia',
//     type: 'Accountant',
//     href: '/',
//   },
//   {
//     name: 'Ricardo Cooper',
//     isAvailable: true,
//     status: 'Available',
//     time: '8:00am',
//     avatarUrl:
//       'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     address: '96 Bass Street, Bungabbee, New South Wales, Australia',
//     type: 'Hairdresser',
//     href: '/',
//   },
//   {
//     name: 'Kristen Ramos',
//     isAvailable: true,
//     status: 'Available',
//     time: '9:00am',
//     avatarUrl:
//       'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     address: '56 Larissa Court, Neds Corner, Victoria, Australia',
//     type: 'Holiday Park',
//     href: '/',
//   },
// ]
const result = [
  {
    name: 'Ricardo Cooper',
    isAvailable: true,
    status: 'Open',
    time: '8:00am',
    avatarUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    address: '96 Bass Street, Bungabbee, New South Wales, Australia',
    type: 'Hairdresser',
    href: '/',
  },
  {
    name: 'Kristen Ramos',
    isAvailable: true,
    status: 'Open',
    time: '9:00am',
    avatarUrl:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    address: '56 Larissa Court, Neds Corner, Victoria, Australia',
    type: 'Holiday Park',
    href: '/',
  },
  {
    name: 'Ted Fox',
    isAvailable: false,
    status: 'Closed',
    time: '7:00pm',
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    address: '50 McPherson Road, Tallangatta, Victoria, Australia',
    type: 'Accountant',
    href: '/',
  },
  {
    name: 'Ricardo Cooper',
    isAvailable: true,
    status: 'Open',
    time: '8:00am',
    avatarUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    address: '96 Bass Street, Bungabbee, New South Wales, Australia',
    type: 'Hairdresser',
    href: '/',
  },
  {
    name: 'Kristen Ramos',
    isAvailable: true,
    status: 'Open',
    time: '9:00am',
    avatarUrl:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    address: '56 Larissa Court, Neds Corner, Victoria, Australia',
    type: 'Holiday Park',
    href: '/',
  },
]
</script>

<template>
  <section class="book-container">
    <p class="text-lg md:text-xl text-gray-800 my-3">{{ props.title }}</p>
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="searchItem in result" :key="searchItem.status">
          <router-link :to="searchItem.href" class="block hover:bg-gray-50">
            <div class="flex items-center px-4 py-4 sm:px-6">
              <div class="min-w-0 flex-1 flex items-center">
                <div class="flex-shrink-0">
                  <img class="h-12 w-12 rounded-full" :src="searchItem.avatarUrl" alt="" />
                </div>
                <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                  <div>
                    <p class="text-sm font-medium text-teal-600 truncate">{{ searchItem.name }}</p>
                    <p class="mt-2 flex items-center text-sm text-gray-500">
                      <CheckCircleIcon
                        v-if="searchItem.isAvailable"
                        class="flex-shrink-0 mr-1.5 h-5 w-5 text-teal-400"
                        aria-hidden="true"
                      />
                      <XCircleIcon v-else class="flex-shrink-0 mr-1.5 h-5 w-5 text-red-400" aria-hidden="true" />
                      <span class="truncate font-semibold">{{ searchItem.status }}</span>
                      <span class="mx-2">-</span>
                      <span class="mr-1">{{ textTimeAvailability(searchItem.isAvailable) }} {{ searchItem.time }}</span>
                    </p>
                  </div>
                  <div class="hidden md:block">
                    <div>
                      <p class="text-sm text-gray-900">
                        {{ searchItem.address }}
                      </p>
                      <p class="mt-2 flex items-center text-sm text-gray-500">
                        {{ searchItem.type }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <ChevronRightIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>
