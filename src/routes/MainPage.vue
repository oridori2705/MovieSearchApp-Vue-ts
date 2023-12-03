<script setup lang="ts">
import MovieSearchBar from '~/components/MovieSearchBar.vue'
import MovieSearchResult from '~/components/MovieSearchResult.vue'
import { useMovieStore } from '~/store/movies'

const movieStore = useMovieStore()
console.log(movieStore.movies)
</script>

<template>
  <main>
    <MovieSearchBar />
    <MovieSearchResult v-if="Object.keys(movieStore.movies).length" />
    <div
      v-else
      class="search-text">
      <p>검색어를 입력하세요!</p>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  max-width: 1300px;
  margin: 0 auto;
  .search-text {
    margin-top: 50px;
  }
}
</style>
