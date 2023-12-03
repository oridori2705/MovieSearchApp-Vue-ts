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
      <div class="movie-more">
        <div class="more-wrap">
          <TheIcon>add</TheIcon>
          <div class="more-text">더 보기</div>
        </div>
      </div>
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
  .movie-more {
    height: 100%;
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
