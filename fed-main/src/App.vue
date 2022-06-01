<script setup lang="ts">
import { inject } from 'vue'
import { uniqKey } from './utils/helpers'
import { Auth, onAuthStateChanged } from 'firebase/auth'
import { useAuthStore } from './store/auth'
import { FirebaseUserResponse } from './types/interfaces'

const $auth = inject('$auth') as Auth
const useAuthState = useAuthStore()

onAuthStateChanged($auth, firebaseUserResponse => {
  const user = firebaseUserResponse as FirebaseUserResponse
  if (user) {
    useAuthState.accessToken = user.accessToken
    useAuthState.accessTokenExpirationTime = user.stsTokenManager.expirationTime
  } else {
    useAuthState.accessToken = ''
    useAuthState.accessTokenExpirationTime = 0
  }
})
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
    <router-view v-slot="{ Component }" name="DefaultNewsletter">
      <transition name="fade" mode="out-in">
        <div :key="uniqKey()">
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
  </main>
  <router-view v-slot="{ Component }" name="DefaultFooter">
    <transition name="fade" mode="out-in">
      <div :key="uniqKey()">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
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
