<script lang="ts">
export default {
  name: 'SearchList',
}
</script>

<script setup lang="ts">
import DefaultSearchList from '../Default/DefaultSearchList/DefaultSearchList.vue'
import DefaultPagination from '../Default/DefaultPagination/DefaultPagination.vue'
</script>

<template>
  <default-search-list title="Locations" type="location" />
  <default-search-list title="People" type="person" />
  <div class="mt-4">
    <default-pagination />
  </div>
</template>
