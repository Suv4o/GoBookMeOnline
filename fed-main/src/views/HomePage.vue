<script lang="ts">
export default {
  name: 'HomePage',
}
</script>

<script setup lang="ts">
import HeroSection from '../components/HomePage/HeroSection.vue'
import DefaultSearchBar from '../components/default/DefaultSearchBar/DefaultSearchBar.vue'
import SearchList from '../components/HomePage/SearchList.vue'
</script>

<template>
  <hero-section />
  <div class="relative">
    <div id="search-bar" class="relative w-full z-20">
      <default-search-bar />
    </div>
    <div class="relative pt-24 sm:pt-12 md:pt-14 w-full z-10">
      <search-list />
    </div>
  </div>
</template>
