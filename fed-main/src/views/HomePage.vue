<script lang="ts">
export default {
  name: 'HomePage',
}
</script>

<script setup lang="ts">
import HeroSection from '../components/main/HeroSection.vue'
import BookSearchBar from '../components/global/BookSearchBar/BookSearchBar.vue'
import SearchList from '../components/main/SearchList.vue'
</script>

<template>
  <hero-section />
  <div class="relative">
    <div class="absolute h-full w-full z-20">
      <book-search-bar />
    </div>
    <div class="absolute top-32 sm:top-20 md:top-24 h-full w-full z-10">
      <search-list />
    </div>
  </div>
</template>
