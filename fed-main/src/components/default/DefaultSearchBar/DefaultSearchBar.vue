<script lang="ts">
export default {
  name: 'DefaultSearchBar',
}
</script>

<script setup lang="ts">
import SearchInput from './SearchInput.vue'
import LocationInput from './LocationInput.vue'
</script>

<template>
  <section class="flex flex-col sm:flex-row default-container mb-10 md:mb-12">
    <div class="basis-2/3 sm:mr-4 relative">
      <div class="absolute w-full h-full z-20">
        <search-input />
      </div>
    </div>
    <div class="basis-1/3 relative">
      <div class="absolute w-full h-full top-14 sm:top-0 z-11">
        <location-input />
      </div>
    </div>
  </section>
</template>
