<script setup lang="ts">
import type { Search } from '~/store/movies'
import TheIcon from './TheIcon.vue'
import { useMovieStore } from '~/store/movies'
import { useRouter, useRoute } from 'vue-router'

const movieStore = useMovieStore()
const router = useRouter()
const route = useRoute()

const props = defineProps<{
  movie: Search
}>()
function onMovieModal() {
  movieStore.fetchMovieItem({
    id: props.movie.imdbID
  })
  router.push(
    `/${route.params.movie}/${route.params.page}/${props.movie.imdbID}`
  )
}
</script>

<template>
  <div
    class="movie-item shadow"
    @click="onMovieModal">
    <div
      v-if="movie.Poster !== 'N/A'"
      class="poster">
      <img :src="movie.Poster" />
    </div>
    <div
      v-else
      class="not-poster"
      @click="onMovieModal">
      <TheIcon>broken_Image</TheIcon>
      <p>포스터 없음</p>
    </div>
    <div class="movie-detail">
      <p>상세보기</p>
    </div>
    <div class="title">
      {{ movie.Title }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.movie-item {
  height: 250px;
  border-bottom: 1px solid var(--border-color);
  padding: 10px 10px 50px 10px;
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: 8px;
  .poster {
    position: relative;
    img {
      overflow: hidden;
      width: 155px;
      height: 240px;
      border-radius: 5px;
    }
  }
  .not-poster {
    width: 155px;
    height: 240px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    p {
      font-size: inherit;
    }
  }
  .movie-detail {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    border: 1px solid white;
    padding: 5px;
    border-radius: 4px;
    z-index: 3;
  }
  .title {
    text-align: center;
    font-size: inherit;
  }
  &:hover {
    .poster {
      &::before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        border-radius: 5px;
        background-color: rgba(#000, 0.5);
        z-index: 2;
      }
    }
    .not-poster {
      &::before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        border-radius: 5px;
        background-color: rgba(#000, 0.5);
        z-index: 2;
      }
    }
    .movie-detail {
      display: block;
    }
  }
}
@media (max-width: 417px) {
  .movie-item {
    font-size: 1rem;
    padding: 10px 4px 50px 4px;
    .poster {
      img {
        width: 100%;
      }
    }
    .not-poster {
      width: 100%;
      p {
        font-size: inherit;
      }
    }
    .title {
      text-align: center;
      font-size: 0.8rem;
    }
  }
}
</style>
