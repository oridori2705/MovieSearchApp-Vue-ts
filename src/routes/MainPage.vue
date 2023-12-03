<script setup lang="ts">
import MovieSearchBar from '~/components/MovieSearchBar.vue'
import MovieSearchResult from '~/components/MovieSearchResult.vue'
import { useMovieStore } from '~/store/movies'
import LoadingSearch from '~/components/LoadingSearch.vue'
const movieStore = useMovieStore()
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
  <div class="loader">
    <LoadingSearch v-if="movieStore.loading" />
  </div>
  <Transition>
    <RouterView />
  </Transition>
</template>

<style lang="scss" scoped>
main {
  max-width: 1300px;
  margin: 0 auto;
  .search-text {
    margin-top: 50px;
  }
}
.loader {
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(-30%, -30%);
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
