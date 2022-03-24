<script setup lang="ts">
import { uniqKey } from './utils/helpers'
</script>

<template>
  <router-view class="absolute pt-6 top-0 left-0 w-full z-10" name="DefaultMainNav" />
  <main>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <div :key="uniqKey()">
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
    <router-view name="DefaultNewsletter" />
  </main>
  <router-view name="DefaultFooter" />
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
