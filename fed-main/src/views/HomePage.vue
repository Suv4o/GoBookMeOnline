<script lang="ts">
export default {
  name: 'HomePage',
}
</script>

<script setup lang="ts">
import HeroSection from '../components/HomePage/HeroSection.vue'
import BookSearchBar from '../components/global/BookSearchBar/BookSearchBar.vue'
import SearchList from '../components/HomePage/SearchList.vue'
import BookNewsletter from '../components/global/BookNewsletter/BookNewsletter.vue'
</script>

<template>
  <hero-section />
  <div class="relative">
    <div class="relative w-full z-20">
      <book-search-bar />
    </div>
    <div class="relative pt-24 sm:pt-12 md:pt-14 w-full z-10">
      <search-list />
    </div>
  </div>
  <book-newsletter />
</template>
