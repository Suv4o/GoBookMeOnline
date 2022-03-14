<script lang="ts">
export default {
  name: 'SearchList',
}
</script>

<script setup lang="ts">
import BookSearchList from '../global/BookSearchList/BookSearchList.vue'
</script>

<template>
  <book-search-list title="Locations" type="location" />
  <book-search-list title="People" type="person" />
</template>
