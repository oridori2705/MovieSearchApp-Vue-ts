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
    movies: {} as ResponseValue
  }),
  getters: {},
  actions: {
    async fetchMovies({ movieName, page = 1 }: searchMoviePayload) {
      try {
        const searchMovies = await request({ movieName, page })

        this.movies = searchMovies
      } catch (error) {
        console.error('fetchedTodos failed', error)
      }
    }
  }
})
