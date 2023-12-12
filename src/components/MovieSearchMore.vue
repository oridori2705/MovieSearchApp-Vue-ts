<script setup lang="ts">
import LoadingSearch from './LoadingSearch.vue'
import TheIcon from './TheIcon.vue'
import { useMovieStore } from '~/store/movies'
import { useRouter } from 'vue-router'

const router = useRouter()
const movieStore = useMovieStore()

const fetchMoreMoives = () => {
  if (
    movieStore.movies.Search.length === Number(movieStore.movies.totalResults)
  ) {
    alert('더이상 검색결과가 없습니다!')
    return
  }

  movieStore.fetchMovies({
    movieName: movieStore.searchMovie,
    page: movieStore.searchPage
  })
  router.push(`/${movieStore.searchMovie}/${movieStore.searchPage}`)
}
</script>

<template>
  <div
    class="movie-more shadow"
    @click="fetchMoreMoives">
    <div class="more-wrap">
      <LoadingSearch v-if="movieStore.loading" />
      <TheIcon v-else>add</TheIcon>
      <div class="more-text">더 보기</div>
      <div>
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
    &:deep(.the-loader) {
      color: #ddd;
    }
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
