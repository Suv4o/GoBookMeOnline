<script lang="ts">
export default {
  name: 'HomePage',
}
</script>

<script setup lang="ts">
import HeroSection from '../components/main/HeroSection.vue'
import BookSearchBar from '../components/global/BookSearchBar/BookSearchBar.vue'
</script>

<template>
  <hero-section />
  <book-search-bar />
</template>
