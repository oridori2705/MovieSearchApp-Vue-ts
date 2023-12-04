<script setup lang="ts">
import { useMovieStore } from '~/store/movies'
import MovieSearchItem from './MovieSearchItem.vue'
import MovieSearchMore from './MovieSearchMore.vue'
const movieStore = useMovieStore()
</script>

<template>
  <div class="result-text">
    {{ `'${movieStore.searchMovie}' 의 검색결과 ` }}
  </div>
  <div class="movies-wrap">
    <div class="movie-list">
      <MovieSearchItem
        v-for="movie in movieStore.movies.Search"
        :key="movie.imdbID"
        :movie="movie" />
      <MovieSearchMore />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.result-text {
  margin-top: 15px;
  font-size: 25px;
  font-weight: 700;
}
.movies-wrap {
  border-radius: 6px;
  overflow: hidden;
  margin-top: 20px;
  cursor: pointer;
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
@media (max-width: 600px) {
  .movies-wrap {
    .movie-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
  }
}
</style>
