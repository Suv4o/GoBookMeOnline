<script lang="ts">
export default {
  name: 'DefaultPagination',
}
</script>

<script setup lang="ts">
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <div class="default-container">
    <nav class="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
      <div class="-mt-px w-0 flex-1 flex">
        <a
          href="#"
          class="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
        >
          <ArrowLongLeftIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          Previous
        </a>
      </div>
      <div class="hidden md:-mt-px md:flex">
        <a
          href="#"
          class="border-teal-500 text-teal-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
        >
          1
        </a>
        <a
          href="#"
          class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
          aria-current="page"
        >
          2
        </a>
        <a
          href="#"
          class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
        >
          3
        </a>
        <span
          class="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
        >
          ...
        </span>
        <a
          href="#"
          class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
        >
          8
        </a>
        <a
          href="#"
          class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
        >
          9
        </a>
        <a
          href="#"
          class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
        >
          10
        </a>
      </div>
      <div class="-mt-px w-0 flex-1 flex justify-end">
        <a
          href="#"
          class="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
        >
          Next
          <ArrowLongRightIcon class="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </a>
      </div>
    </nav>
  </div>
</template>
