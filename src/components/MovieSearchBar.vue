<script setup lang="ts">
import TheIcon from '~/components/TheIcon.vue'
import { ref } from 'vue'
import { useMovieStore } from '~/store/movies'
import { useRouter } from 'vue-router'
import LoadingSearch from '~/components/LoadingSearch.vue'

const movieName = ref('')

const router = useRouter()

const movieStore = useMovieStore()

async function searchMovie(event: MouseEvent | KeyboardEvent) {
  //한글 입력시 브라우저에서 구조화하는 것 때문에 두번 요청이 들어감
  if (event instanceof KeyboardEvent && event.isComposing) return
  if (!movieName.value.trim()) return
  try {
    router.push(`/${movieName.value}/1`)
    await movieStore.fetchMovies({
      movieName: movieName.value,
      page: 1
    })

    movieName.value = ''
  } catch (error) {
    console.error('Moviesfetch failed')
  }
}

function updateMovieName(event: Event) {
  const target = event.target
  if (target instanceof HTMLInputElement) {
    movieName.value = target.value
  }
}
</script>

<template>
  <div class="moive-search">
    <input
      placeholder="영화를 검색해보세요!"
      :value="movieName"
      @input="updateMovieName"
      @keydown.enter="searchMovie" />
    <LoadingSearch v-if="movieStore.loading" />
    <TheIcon v-else>search</TheIcon>
  </div>
</template>

<style lang="scss" scoped>
.moive-search {
  height: 80px;
  display: flex;
  position: relative;
  :deep(.the-loader),
  :deep(.the-icon) {
    color: royalblue;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: 24px;
    z-index: 1;
  }
  input {
    padding: 0 10px 0 80px;
    border: none;
    outline: none;
    border-radius: 6px;
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    &::placeholder {
      color: #ccc;
    }
  }
}
</style>
