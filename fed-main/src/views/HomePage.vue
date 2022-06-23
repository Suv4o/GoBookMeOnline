<script lang="ts">
export default {
  name: 'HomePage',
}
</script>

<script setup lang="ts">
import HeroSection from '../components/HomePage/HeroSection.vue'
import DefaultSearchBar from '../components/Default/DefaultSearchBar/DefaultSearchBar.vue'
import SearchList from '../components/HomePage/SearchList.vue'
import { useNotification } from '../utils/composables/notiofication'
import { NotificationTypes } from '../store/notification'
import { inject, onBeforeMount } from 'vue'
import { useValidator } from '../utils/composables/validator'
import { Auth, isSignInWithEmailLink, signInWithEmailLink } from '@firebase/auth'
import { Assertions } from '../types/guards'
import { parseFirebaseError } from '../utils/helpers'

const $auth = inject('$auth') as Auth

onBeforeMount(() => {
  showNotifications()
})

async function showNotifications() {
  const params = new URLSearchParams(window.location.search)

  if (params.has('successfully-created') && params.get('successfully-created') === 'true') {
    window.history.pushState({}, document.title, '/')
    useNotification({
      type: NotificationTypes.Success,
      title: 'Successfully created!',
      message: 'Your account has been created. Make your next booking now!',
    })
  }

  if (params.has('user')) {
    const email = params.get('user')

    const { validProps } = useValidator({
      email: email ? email : '',
    })

    if (email && validProps.email.valid && isSignInWithEmailLink($auth, window.location.href)) {
      try {
        await signInWithEmailLink($auth, email, window.location.href)
        window.history.pushState({}, document.title, '/')
        useNotification({
          type: NotificationTypes.Success,
          title: 'Successfully Signed In!',
          message: 'Your have been signed in. Make your next booking now!',
        })
      } catch (error) {
        Assertions.isError(error)
        const readableError = parseFirebaseError(error.message)
        if (readableError) {
          useNotification({ type: NotificationTypes.Error, title: 'Error', message: readableError })
        } else {
          useNotification({ type: NotificationTypes.Error, title: error.name, message: error.message })
        }
      }
    }
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
