<script setup lang="ts">
import type { Search } from '~/store/movies'

defineProps<{
  movie: Search
}>()
</script>

<template>
  <div class="movie-item shadow">
    <div class="poster">
      <img :src="movie.Poster" />
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
}
</style>
