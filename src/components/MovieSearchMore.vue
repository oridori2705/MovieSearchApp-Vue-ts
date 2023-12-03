<script setup lang="ts">
import TheIcon from './TheIcon.vue'
import { useMovieStore } from '~/store/movies'

const movieStore = useMovieStore()

function fetchMoreMoives() {
  movieStore.fetchMovies({
    movieName: movieStore.searchMovie,
    page: movieStore.searchPage
  })
}
</script>

<template>
  <div
    class="movie-more shadow"
    @click="fetchMoreMoives">
    <div class="more-wrap">
      <TheIcon>add</TheIcon>
      <div class="more-text">더 보기</div>
      <div class="">
        {{
          `${movieStore.movies.Search.length} / ${movieStore.movies.totalResults}`
        }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.movie-more {
  height: 311px;
  background-color: rgba(#fff, 0.6);
  border-radius: 8px;
  position: relative;
  .more-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    &:deep(.the-icon) {
      border: 1px solid;
    }
    .more-text {
      margin-top: 5px;
      font-size: 16px;
    }
  }
  &:hover {
    background-color: rgba(#ddd, 0.6);
    .more-wrap {
      &:deep(.the-icon) {
        border: 1px solid #fff;
        color: #ddd;
      }
      .more-text {
        color: #ddd;
      }
    }
  }
}
</style>
