import axios from 'axios'
import { defineStore } from 'pinia'
import {
  Search,
  searchMoviePayload,
  movieDetailPayload,
  currentMovie,
  movies
} from './moviesTypes'
import { useRouter } from 'vue-router'

export const useMovieStore = defineStore('moives', {
  state: () => ({
    movies,
    searchMovie: '',
    searchPage: 1,
    currentMovie,
    loading: false
  }),
  getters: {},
  actions: {
    async fetchMovies({ movieName, page = 1 }: searchMoviePayload) {
      const router = useRouter()
      if (this.loading) return
      this.loading = true
      if (this.searchMovie !== movieName) {
        this.searchPage = 1
      }
      try {
        for (let i = this.searchPage; i <= page; i++) {
          const { data: searchMovies } = await axios.post('/api/movie', {
            method: 'GET',
            movieName,
            page: i
          })
          if (
            searchMovies.Response === 'False' &&
            this.movies.Search.length > 0 &&
            this.movies.Search.length === Number(this.movies.totalResults)
          ) {
            alert('더이상 검색결과가 없습니다!')
            router.push(
              `/${movieName}/${this.searchPage}${
                this.currentMovie.imdbID ? `/${this.currentMovie.imdbID}` : ''
              }`
            )
            break
          }
          if (searchMovies.Response === 'False') {
            this.movies = searchMovies
            break
          }
          if (i === 1) {
            searchMovies.Search.forEach((mv: Search) => {
              mv.Poster = mv.Poster.replace('SX300', 'SX700')
            })
            this.movies = searchMovies
          } else {
            searchMovies.Search.forEach((mv: Search) => {
              mv.Poster = mv.Poster.replace('SX300', 'SX700')
            })
            this.movies.Search.push(...searchMovies.Search)
          }
        }

        this.searchMovie = movieName
        this.searchPage = ++page
      } catch (error) {
        if (error instanceof Error) {
          console.error('fetchedMovies failed', error)
        }
      } finally {
        this.loading = false
      }
    },
    async fetchMovieItem({ id, plot = 'full' }: movieDetailPayload) {
      if (this.loading) return
      this.loading = true
      try {
        const { data: movieDetail } = await axios.post('/api/movie', {
          method: 'GET',
          id,
          plot
        })
        movieDetail.Poster = movieDetail.Poster.replace('SX300', 'SX700')

        this.currentMovie = movieDetail
      } catch (error) {
        if (error instanceof Error) {
          console.error('fetchedMovieDetail failed', error)
        }
      } finally {
        this.loading = false
      }
    }
  }
})
