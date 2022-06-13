<script lang="ts">
export default {
  name: 'HomePage',
}
</script>

<script setup lang="ts">
import HeroSection from '../components/HomePage/HeroSection.vue'
import DefaultSearchBar from '../components/Default/DefaultSearchBar/DefaultSearchBar.vue'
import SearchList from '../components/HomePage/SearchList.vue'
import router from '../router'
import { useNotification } from '../utils/composables/notiofication'
import { NotificationTypes } from '../store/notification'
import { onBeforeMount } from 'vue'

onBeforeMount(() => {
  showNotificationForCreatedUser()
})

function showNotificationForCreatedUser() {
  const params = new URLSearchParams(window.location.search)

  if (params.has('successfully-created') && params.get('successfully-created') === 'true') {
    router.push({ name: 'home' })
    useNotification({
      type: NotificationTypes.Success,
      title: 'Successfully verified your email!',
      message: 'Your account has been created. Make your next booking now!',
    })
  }
}
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
