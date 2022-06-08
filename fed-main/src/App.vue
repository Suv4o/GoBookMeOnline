<script setup lang="ts">
import { inject } from 'vue'
import { uniqKey } from './utils/helpers'
import { Auth, onAuthStateChanged } from 'firebase/auth'
import { useAuthStore } from './store/auth'
import { AuthStateUser } from './types/interfaces'
import { AuthState } from './store/auth'

const $auth = inject('$auth') as Auth
const useAuthState = useAuthStore()

interface CurrentUserDetails {
  accessToken: AuthState['accessToken']
  accessTokenExpirationTime: AuthState['accessTokenExpirationTime']
  uid: AuthStateUser['uid']
  firstName: AuthStateUser['firstName']
  lastName: AuthStateUser['lastName']
  role: AuthStateUser['role']
  email: AuthStateUser['email']
  displayName: AuthStateUser['displayName']
  photoURL: AuthStateUser['photoURL']
  emailVerified: AuthStateUser['emailVerified']
}

onAuthStateChanged($auth, user => {
  if (user) {
    console.log('User is signed in:', user)

    getUserClaims()
      .then(claims => {
        const {
          accessToken,
          accessTokenExpirationTime,
          uid,
          firstName,
          lastName,
          role,
          email,
          displayName,
          photoURL,
          emailVerified,
        } = claims as CurrentUserDetails
        useAuthState.accessToken = accessToken
        useAuthState.accessTokenExpirationTime = accessTokenExpirationTime
        useAuthState.user = {
          uid,
          firstName,
          lastName,
          role,
          email,
          displayName,
          photoURL,
          emailVerified,
        }
      })
      .catch(error => {
        console.error(error)
      })
  } else {
    useAuthState.accessToken = ''
    useAuthState.accessTokenExpirationTime = 0
    useAuthState.user = null
  }
})

async function getUserClaims() {
  try {
    const currentUserDetails = await $auth.currentUser?.getIdTokenResult(true)

    return {
      accessToken: currentUserDetails?.token,
      accessTokenExpirationTime: Number(currentUserDetails?.claims.exp),
      uid: currentUserDetails?.claims.user_id,
      email: currentUserDetails?.claims.email,
      displayName: currentUserDetails?.claims.name,
      photoURL: currentUserDetails?.claims.picture,
      emailVerified: currentUserDetails?.claims.email_verified,
      firstName: currentUserDetails?.claims.firstName,
      lastName: currentUserDetails?.claims.lastName,
      role: currentUserDetails?.claims.role,
    }
  } catch (error) {
    console.error(error)
  }
}
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
