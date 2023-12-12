<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useMovieStore } from '~/store/movies'
import LoadingModal from '~/components/LoadingModal.vue'

const movieStore = useMovieStore()
const router = useRouter()
const route = useRoute()

if (route.params.id) {
  const foundTodo = movieStore.movies.Search.find(
    movie => movie.imdbID === route.params.id
  )
  foundTodo
    ? movieStore.fetchMovieItem({ id: foundTodo.imdbID })
    : router.push('/')
}

const offModal = () => {
  router.push(`/${movieStore.searchMovie}/${route.params.page}`)
}
</script>

<template>
  <div class="modal">
    <div
      class="background"
      @click="offModal"></div>

    <div class="contents scroll">
      <div
        v-if="movieStore.loading"
        class="loading-modal">
        <LoadingModal />
      </div>
      <div
        v-else
        class="contents-div">
        <div class="poster">
          <img
            :src="movieStore.currentMovie.Poster"
            alt="" />
        </div>
        <div class="contents-info">
          <div class="title">{{ movieStore.currentMovie.Title }}</div>
          <div class="imdb-Rating">
            {{
              `👍평점 : ${movieStore.currentMovie.imdbRating} / ❤좋아요 : ${movieStore.currentMovie.imdbVotes}`
            }}
          </div>
          <div class="boxoffice">
            {{ `🎉박스오피스 : ${movieStore.currentMovie.BoxOffice}` }}
          </div>
          <div class="detail-info">
            <div class="director">
              {{ `디렉터 : ${movieStore.currentMovie.Director}` }}
            </div>
            <div class="writer">
              {{ `각본 : ${movieStore.currentMovie.Writer}` }}
            </div>
            <div class="actor">
              {{ `배우 : ${movieStore.currentMovie.Actors}` }}
            </div>
            <div class="genre">
              {{ `장르 : ${movieStore.currentMovie.Genre}` }}
            </div>
            <div class="released">
              {{ `개봉일 : ${movieStore.currentMovie.Released}` }}
            </div>
          </div>
          <div class="plot">
            <div class="plot-title">줄거리</div>
            <div class="plot-content">
              <p>
                {{ movieStore.currentMovie.Plot }}
              </p>
            </div>
          </div>
          <div
            v-for="rating in movieStore.currentMovie.Ratings"
            :key="rating.Source"
            class="ratings">
            {{ `${rating.Source}에서의 평점 : ${rating.Value}` }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;

  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(#000, 0.7);
  }
  .contents {
    margin: 0 20px;
    width: 100%;
    max-width: calc(100vw - 200px);
    max-height: calc(100vh - 40px);
    overflow: auto;
    border-radius: 6px;
    background-color: #fff;
    position: relative;
    .loading-modal {
      width: 100%;
      height: 100%;
    }
    .contents-div {
      display: flex;

      .poster {
        padding: 4%;

        img {
          width: 35vw;
          border-radius: 9px;
        }
      }
      .contents-info {
        line-height: 1.5;
        .title {
          font-size: 30px;
          font-weight: 700;
        }
        .imdb-Rating {
          font-size: 15px;
        }
        .boxoffice {
          font-size: 15px;
          border-bottom: 1px solid rgba(#000, 0.7);
        }
        .detail-info {
          font-size: 14px;
          border-bottom: 1px solid rgba(#000, 0.7);
        }
        .plot {
          line-height: 1;
          border-bottom: 1px solid rgba(#000, 0.7);
          padding: 5px 0 5px 3px;
          &-title {
            font-size: 15px;
            padding: 5px;
          }
          &-content {
            font-size: 14px;
          }
        }
      }
    }
  }
}
@media (max-width: 630px) {
  .modal {
    .contents {
      max-width: calc(100vw - 80px);
      .contents-div {
        flex-direction: column;
        .poster {
          img {
            width: calc(94vw - 80px);
          }
        }
      }
    }
  }
}
</style>
