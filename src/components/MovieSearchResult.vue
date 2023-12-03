<script setup lang="ts">
import { useMovieStore } from '~/store/movies'
import MovieSearchItem from './MovieSearchItem.vue'
import TheIcon from './TheIcon.vue'
const movieStore = useMovieStore()
</script>

<template>
  <div class="movies-wrap">
    <div class="movie-list">
      <MovieSearchItem
        v-for="movie in movieStore.movies.Search"
        :key="movie.imdbID"
        :movie="movie" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.movies-wrap {
  border-radius: 6px;
  overflow: hidden;
  margin-top: 20px;
  .movie-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
  }
}

@media (max-width: 1300px) {
  .movies-wrap {
    .movie-list {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
@media (max-width: 1000px) {
  .movies-wrap {
    .movie-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
