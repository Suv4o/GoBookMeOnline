<script lang="ts">
export default {
  name: 'LocationInput',
}
</script>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { LocationMarkerIcon } from '@heroicons/vue/solid'
import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption } from '@headlessui/vue'

const locations = [{ id: 1, suburb: 'Leslie Alexander' }]

const selectedLocation = ref('')
const isLocationSelected = ref(false)
const query = ref('')
const filteredLocations = computed(() =>
  query.value === ''
    ? []
    : locations.filter(location => {
        return location.suburb.toLowerCase().includes(query.value.toLowerCase())
      })
)

watch(query, queryValue => {
  if (isLocationSelected.value && queryValue !== selectedLocation.value) {
    isLocationSelected.value = false
  }
})

function onSelect(location: any) {
  selectedLocation.value = location.suburb
  query.value = location.suburb
  isLocationSelected.value = true
}
</script>

<template>
  <Combobox
    v-model="selectedLocation"
    as="div"
    class="transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
    @update:model-value="onSelect"
  >
    <div class="relative">
      <LocationMarkerIcon
        class="pointer-events-none absolute top-3.5 left-3 md:left-4 h-5 w-5 md:h-7 md:w-6 text-gray-400"
        aria-hidden="true"
      />
      <ComboboxInput
        class="h-12 md:h-14 w-full border-0 bg-transparent pl-10 md:pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 text-md md:text-lg"
        placeholder="Suburb or postcode"
        @change="query = $event.target.value"
      />
    </div>

    <ComboboxOptions
      v-if="filteredLocations.length > 0 && !isLocationSelected"
      static
      class="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
    >
      <ComboboxOption
        v-for="location in filteredLocations"
        :key="location.id"
        v-slot="{ active }"
        :value="location"
        as="template"
      >
        <li :class="['cursor-default select-none px-4 py-2', active && 'bg-teal-600 text-white']">
          {{ location.suburb }}
        </li>
      </ComboboxOption>
    </ComboboxOptions>

    <p v-if="query !== '' && filteredLocations.length === 0" class="p-4 text-sm text-gray-500">No location found.</p>
  </Combobox>
</template>
