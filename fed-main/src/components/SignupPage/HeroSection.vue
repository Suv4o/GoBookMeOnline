<script lang="ts">
export default {
  name: 'HeroSection',
}
</script>

<script setup lang="ts">
import SignupForm from './SignupForm.vue'
</script>

<template>
  <div class="relative overflow-hidden">
    <div class="default-container hidden sm:block sm:absolute sm:inset-0" aria-hidden="true">
      <svg
        class="absolute bottom-0 right-0 transform translate-x-1/2 mb-48 text-gray-700 lg:top-0 lg:mt-28 lg:mb-0 xl:transform-none xl:translate-x-0"
        width="364"
        height="384"
        viewBox="0 0 364 384"
        fill="none"
      >
        <defs>
          <pattern
            id="eab71dd9-9d7a-47bd-8044-256344ee00d0"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="364" height="384" class="text-gray-200" fill="url(#eab71dd9-9d7a-47bd-8044-256344ee00d0)" />
      </svg>
    </div>
    <div class="relative pt-16 pb-16 sm:pb-24">
      <div class="mt-16 default-container sm:mt-24">
        <div class="lg:grid lg:grid-cols-12 lg:gap-8">
          <div
            class="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center"
          >
            <div>
              <h1
                class="mt-4 text-4xl tracking-tight font-extrabold text-gray-900 sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl"
              >
                <span class="md:block">Go and Book Me</span>
                {{ ' ' }}
                <span class="text-teal-600 md:block">today</span>
              </h1>
              <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                fugiat veniam occaecat fugiat aliqua ad ad non deserunt sunt.
              </p>
            </div>
          </div>
          <div class="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6"><signup-form /></div>
        </div>
      </div>
    </div>
  </div>
</template>
