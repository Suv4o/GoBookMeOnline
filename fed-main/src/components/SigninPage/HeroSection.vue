<script lang="ts">
export default {
  name: 'HeroSection',
}
</script>

<script setup lang="ts">
import SigninForm from './SigninForm.vue'
</script>

<template>
  <div class="default-container pt-20">
    <div class="min-h-full flex sm:px-4">
      <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <signin-form />
      </div>
      <div class="hidden lg:block relative w-0 flex-1">
        <img
          class="absolute inset-0 h-full w-full object-cover"
          src="../../assets/images/hero/signin-image.jpg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
