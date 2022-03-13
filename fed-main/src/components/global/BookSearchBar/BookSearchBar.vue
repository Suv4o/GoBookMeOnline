<script lang="ts">
export default {
  name: 'BookSearchBar',
}
</script>

<script setup lang="ts">
import SearchInput from './SearchInput.vue'
import LocationInput from './LocationInput.vue'
</script>

<template>
  <section class="flex flex-col sm:flex-row book-container mb-10 md:mb-12">
    <div class="basis-2/3 sm:mr-4 mb-2 sm:mb-0">
      <search-input />
    </div>
    <div class="basis-1/3"><location-input /></div>
  </section>
</template>
