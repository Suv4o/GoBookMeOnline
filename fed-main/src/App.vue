<script setup lang="ts">
import BookNewsletter from './components/global/BookNewsletter/BookNewsletter.vue'
import BookFooter from './components/global/BookFooter/BookFooter.vue'
</script>

<template>
  <main>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <div :key="Date.now()">
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
    <book-newsletter />
  </main>
  <book-footer />
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
