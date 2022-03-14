<script lang="ts">
export default {
  name: 'SearchList',
}
</script>

<script setup lang="ts">
import BookSearchList from '../global/BookSearchList/BookSearchList.vue'
import BookPagination from '../global/BookPagination/BookPagination.vue'
</script>

<template>
  <book-search-list title="Locations" type="location" />
  <book-search-list title="People" type="person" />
  <div class="mt-4">
    <book-pagination />
  </div>
</template>
