<script setup lang="ts">
import type { Search } from '~/store/movies'
import TheIcon from './TheIcon.vue'

const props = defineProps<{
  movie: Search
}>()
console.log(props.movie)
</script>

<template>
  <div class="movie-item shadow">
    <div
      v-if="movie.Poster !== 'N/A'"
      class="poster">
      <img :src="movie.Poster" />
    </div>
    <div
      v-else
      class="not-poster">
      <TheIcon>broken_Image</TheIcon>
      <p>포스터 없음</p>
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
  padding: 30px 20px 30px 20px;
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: 8px;
  .poster {
    img {
      overflow: hidden;
      width: 140px;
      border-radius: 5px;
    }
  }
  .not-poster {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    p {
      font-size: 14px;
    }
  }
}
</style>
