<script setup lang="ts">
import DefaultNewsletter from './components/Default/DefaultNewsletter/DefaultNewsletter.vue'
import DefaultFooter from './components/Default/DefaultFooter/DefaultFooter.vue'
import DefaultMainNav from './components/Default/DefaultMainNav/DefaultMainNav.vue'
import { uniqKey } from './utils/helpers'
</script>

<template>
  <div class="absolute pt-6 top-0 left-0 w-full z-10">
    <default-main-nav />
  </div>
  <main>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <div :key="uniqKey()">
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
    <default-newsletter />
  </main>
  <default-footer />
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
