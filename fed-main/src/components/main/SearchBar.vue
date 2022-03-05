<script lang="ts">
export default {
  name: 'SearchBar',
}
</script>

<script setup lang="ts">
import SearchInput from './SearchInput.vue'
import LocationInput from './LocationInput.vue'
</script>

<template>
  <div class="flex flex-row mx-auto max-w-3xl">
    <div class="basis-2/3 mr-4">
      <search-input />
    </div>
    <div class="basis-1/3"><location-input /></div>
  </div>
</template>
