<script setup lang="ts">
import BookNewsletter from './components/global/BookNewsletter/BookNewsletter.vue'
import BookFooter from './components/global/BookFooter/BookFooter.vue'
</script>

<template>
  <main>
    <router-view></router-view>
    <book-newsletter />
  </main>
  <book-footer />
</template>
