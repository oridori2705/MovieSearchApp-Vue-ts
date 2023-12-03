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
interface movieDetailPayload {
  id: string
  plot?: 'short' | 'full'
}

interface Movie {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: {
    Source: string
    Value: string
  }[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}

const currentMovie: Movie = {
  Title: '',
  Year: '',
  Rated: '',
  Released: '',
  Runtime: '',
  Genre: '',
  Director: '',
  Writer: '',
  Actors: '',
  Plot: '',
  Language: '',
  Country: '',
  Awards: '',
  Poster: '',
  Ratings: [
    {
      Source: '',
      Value: ''
    }
  ],
  Metascore: '',
  imdbRating: '',
  imdbVotes: '',
  imdbID: '',
  Type: '',
  DVD: '',
  BoxOffice: '',
  Production: '',
  Website: '',
  Response: ''
}

export const useMovieStore = defineStore('moives', {
  state: () => ({
    movies: {} as ResponseValue,
    searchMovie: '',
    searchPage: 1,
    currentMovie
  }),
  getters: {},
  actions: {
    async fetchMovies({ movieName, page = 1 }: searchMoviePayload) {
      try {
        const searchMovies = await request({ movieName, page })

        if (page === 1) {
          this.movies = searchMovies
        } else {
          this.movies.Search.push(...searchMovies.Search)
        }
        this.searchMovie = movieName
        this.searchPage += page + 1
      } catch (error) {
        console.error('fetchedMovies failed', error)
      }
    },
    async fetchMovieItem({ id, plot = 'full' }: movieDetailPayload) {
      try {
        const movieDetail = await request({ id, plot })
        this.currentMovie = movieDetail
        console.log(movieDetail)
      } catch (error) {
        console.error('fetchedMovieDetail failed', error)
      }
    }
  }
})
