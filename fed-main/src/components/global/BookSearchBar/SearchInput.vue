<script lang="ts">
export default {
  name: 'SearchInput',
}
</script>

<script setup lang="ts">
import { VueRefTargetElement } from '../../../types/interfaces'
import { computed, ref, reactive, onMounted, onUnmounted, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { SearchIcon } from '@heroicons/vue/solid'
import { ChevronRightIcon, UsersIcon } from '@heroicons/vue/outline'
import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption } from '@headlessui/vue'
import { Assertions } from '../../../types/guards'

const people = [
  {
    id: 1,
    name: 'Leslie Alexander',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    name: 'Juniper Moody',
    phone: '1-582-300-8610',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 3,
    name: 'Miyah Brady',
    phone: '1-316-938-5949',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 4,
    name: 'Ellen Walker',
    phone: '1-203-368-8795',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 5,
    name: 'Emma Nicholson',
    phone: '1-248-393-7011',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]

// const recent = [people[0], people[1], people[2], people[3], people[4]]
const recent: any = [people[0], people[1]]
const isSearchFocused = ref(false)
const searchCombobox = ref<VueRefTargetElement | null>(null)
const searchInput = ref<VueRefTargetElement | null>(null)
const searchedItem = ref('')
const query = ref('')
const focusInfo = reactive({
  currentFocusedEl: <HTMLElement | null>null,
  targetInputEl: <HTMLElement | null>null,
  targetComboboxEl: <HTMLElement | null>null,
})
const filteredPeople = computed(() =>
  query.value === ''
    ? []
    : people.filter(person => {
        return person.name.toLowerCase().includes(query.value.toLowerCase())
      })
)

onMounted(() => {
  window.addEventListener('focus', setFocusInfoOnFocus, true)
})

onUnmounted(() => {
  window.removeEventListener('blur', setFocusInfoOnFocus, true)
})

function onSelect(person: any) {
  window.location = person.url
}

function setDropdownSearch() {
  isSearchFocused.value = true
}

function unsetDropdownSearch() {
  isSearchFocused.value = false
}

function setFocusInfoOnFocus(event: Event) {
  if (event.target == window) {
    return
  }

  const currentFocusedEl = event.target as HTMLElement
  const targetInputEl = searchInput.value ? searchInput.value.$el : null
  const targetComboboxEl = searchCombobox.value ? searchCombobox.value.$el : null
  focusInfo.currentFocusedEl = currentFocusedEl
  focusInfo.targetInputEl = targetInputEl
  focusInfo.targetComboboxEl = targetComboboxEl
}

function unsetDropdownSearchOnBlur() {
  if (
    focusInfo.currentFocusedEl !== focusInfo.targetInputEl &&
    !focusInfo.targetComboboxEl?.contains(focusInfo.currentFocusedEl)
  ) {
    searchedItem.value = query.value
    unsetDropdownSearch()
  }
}

function search(event: Event) {
  const target = event.target as HTMLInputElement
  target.blur()
  searchedItem.value = query.value
  unsetDropdownSearch()
}

function onFocus() {
  setDropdownSearch()
  scrollTo()
}

function scrollTo() {
  const searchBar = document.getElementById('search-bar')

  Assertions.isHTMLElement(searchBar)

  window.scrollTo({
    top: searchBar.getBoundingClientRect().top + window.scrollY - 35,
    behavior: 'smooth',
  })
}

onClickOutside(searchCombobox, event => {
  searchedItem.value = query.value
  unsetDropdownSearch()
})

watch(
  () => ({ ...focusInfo }),
  () => {
    unsetDropdownSearchOnBlur()
  }
)
</script>

<template>
  <Combobox
    v-slot="{ activeOption }"
    ref="searchCombobox"
    v-model="searchedItem"
    as="div"
    class="transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white sm:shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
    @update:model-value="onSelect"
  >
    <div class="relative">
      <SearchIcon
        class="pointer-events-none absolute top-3.5 left-3 md:left-4 h-5 w-5 md:h-7 md:w-6 text-gray-400"
        aria-hidden="true"
      />
      <ComboboxInput
        ref="searchInput"
        class="h-12 md:h-14 w-full border-0 bg-transparent pl-10 md:pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 text-md md:text-lg"
        placeholder="Search..."
        @focus="onFocus"
        @keyup.enter="search"
        @change="query = $event.target.value"
      />
    </div>

    <ComboboxOptions
      v-if="query === '' || filteredPeople.length > 0"
      class="flex divide-x divide-gray-100"
      as="div"
      static
      hold
    >
      <div
        v-if="isSearchFocused && (query !== '' || recent.length)"
        :class="['max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4', activeOption && 'sm:h-96']"
      >
        <h2 v-if="query === '' && recent.length" class="mt-2 mb-4 text-xs font-semibold text-gray-500">
          Recent searches
        </h2>
        <div hold class="-mx-2 text-sm text-gray-700">
          <ComboboxOption
            v-for="person in query === '' ? recent : filteredPeople"
            :key="person.id"
            v-slot="{ active }"
            :value="person"
            as="template"
          >
            <div
              :class="[
                'group flex cursor-default select-none items-center rounded-md p-2',
                active && 'bg-gray-100 text-gray-900',
              ]"
            >
              <img :src="person.imageUrl" alt="" class="h-6 w-6 flex-none rounded-full" />
              <span class="ml-3 flex-auto truncate">{{ person.name }}</span>
              <ChevronRightIcon v-if="active" class="ml-3 h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </div>
          </ComboboxOption>
        </div>
      </div>

      <div
        v-if="activeOption"
        class="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex"
      >
        <div class="flex-none p-6 text-center">
          <img :src="activeOption.imageUrl" alt="" class="mx-auto h-16 w-16 rounded-full" />
          <h2 class="mt-3 font-semibold text-gray-900">
            {{ activeOption.name }}
          </h2>
          <p class="text-sm leading-6 text-gray-500">{{ activeOption.role }}</p>
        </div>
        <div class="flex flex-auto flex-col justify-between p-6">
          <dl class="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
            <dt class="col-end-1 font-semibold text-gray-900">Phone</dt>
            <dd>{{ activeOption.phone }}</dd>
            <dt class="col-end-1 font-semibold text-gray-900">URL</dt>
            <dd class="truncate">
              <a :href="activeOption.url" class="text-teal-600 underline">
                {{ activeOption.url }}
              </a>
            </dd>
            <dt class="col-end-1 font-semibold text-gray-900">Email</dt>
            <dd class="truncate">
              <a :href="`mailto:${activeOption.email}`" class="text-teal-600 underline">
                {{ activeOption.email }}
              </a>
            </dd>
          </dl>
          <button
            type="button"
            class="mt-6 w-full rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Send message
          </button>
        </div>
      </div>
    </ComboboxOptions>

    <div v-if="query !== '' && filteredPeople.length === 0" class="py-14 px-6 text-center text-sm sm:px-14">
      <UsersIcon class="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
      <p class="mt-4 font-semibold text-gray-900">No people found</p>
      <p class="mt-2 text-gray-500">We couldn’t find anything with that term. Please try again.</p>
    </div>
  </Combobox>
</template>
