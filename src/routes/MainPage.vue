<script setup lang="ts">
import MovieSearchBar from '~/components/MovieSearchBar.vue'
import MovieSearchResult from '~/components/MovieSearchResult.vue'
</script>

<template>
  <main>
    <MovieSearchBar />
    <MovieSearchResult />
  </main>
</template>

<style scoped lang="scss">
.main {
  max-width: 700px;
  margin: 0 auto;
}
</style>
