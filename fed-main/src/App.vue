<script setup lang="ts">
import BookNewsletter from './components/global/BookNewsletter/BookNewsletter.vue'
import BookFooter from './components/global/BookFooter/BookFooter.vue'
import BookMainNav from './components/global/BookMainNav/BookMainNav.vue'
import { uniqKey } from './utils/helpers'
</script>

<template>
  <div class="absolute pt-6 top-0 left-0 w-full z-10">
    <book-main-nav />
  </div>
  <main>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <div :key="uniqKey()">
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
