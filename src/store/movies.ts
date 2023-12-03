import { defineStore } from 'pinia'
import { request } from '~/api/api'

export interface ResponseValue {
  Search: Search[]
  totalResults: string
  Response: string
}
export type Search = {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

interface searchMoviePayload {
  movieName: string
  page?: number
}

export const useMovieStore = defineStore('moives', {
  state: () => ({
    movies: {} as ResponseValue,
    searchMovie: '',
    searchPage: 1
  }),
  getters: {},
  actions: {
    async fetchMovies({ movieName, page = 1 }: searchMoviePayload) {
      try {
        const searchMovies = await request({ movieName, page })
        console.log(searchMovies)
        if (page === 1) {
          this.movies = searchMovies
        } else {
          this.movies.Search.push(...searchMovies.Search)
        }
        console.log(this.movies)
        this.searchMovie = movieName
        this.searchPage += page + 1
      } catch (error) {
        console.error('fetchedTodos failed', error)
      }
    }
  }
})
