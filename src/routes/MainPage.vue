<script setup lang="ts">
import MovieSearchBar from '~/components/MovieSearchBar.vue'
import MovieSearchResult from '~/components/MovieSearchResult.vue'
import { useMovieStore } from '~/store/movies'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'

const movieStore = useMovieStore()
const route = useRoute()

onMounted(() => {
  let refreshPage = Number(route.params.page)
  if (route.params.movie) {
    movieStore.fetchMovies({
      movieName: route.params.movie.toString(),
      page: refreshPage
    })
  }
})
</script>

<template>
  <main>
    <MovieSearchBar />
    <MovieSearchResult
      v-if="
        Object.keys(movieStore.movies).length &&
        movieStore.movies.Response === 'True'
      " />
    <div
      v-else-if="movieStore.movies.Response === 'False'"
      class="search-text">
      <p>{{ movieStore.movies.Error }}</p>
      <p>검색어를 다시 입력해주세요!</p>
    </div>
    <div
      v-else
      class="search-text">
      <p>영문으로 검색어를 입력하세요!</p>
    </div>
  </main>
  <Transition>
    <RouterView v-if="movieStore.searchPage > Number(route.params.page)" />
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
