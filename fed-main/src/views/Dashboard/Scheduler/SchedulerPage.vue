<script lang="ts">
export default {
  name: 'DashboardPage',
}
</script>

<script setup lang="ts">
import FullCalendar from './FullCalendar.vue'
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
    <div class="py-4">
      <FullCalendar />
    </div>
  </div>
</template>
