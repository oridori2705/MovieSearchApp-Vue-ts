<script setup lang="ts">
import MovieSearchBar from '~/components/MovieSearchBar.vue'
import MovieSearchResult from '~/components/MovieSearchResult.vue'
import { useMovieStore } from '~/store/movies'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'

const movieStore = useMovieStore()
const route = useRoute()

onMounted(() => {
  if (route.params.movie) {
    movieStore.fetchMovies({ movieName: route.params.movie as string })
  }
})
</script>

<template>
  <main>
    <MovieSearchBar />
    <MovieSearchResult v-if="Object.keys(movieStore.movies).length" />
    <div
      v-else
      class="search-text">
      <p>영문으로 검색어를 입력하세요!</p>
    </div>
  </main>
  <Transition>
    <RouterView v-if="Object.keys(movieStore.movies).length" />
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
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
