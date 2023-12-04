import axios from 'axios'
import { defineStore } from 'pinia'

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
    currentMovie,
    loading: false
  }),
  getters: {},
  actions: {
    async fetchMovies({ movieName, page = 1 }: searchMoviePayload) {
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
        console.error('fetchedMovies failed', error)
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
        console.error('fetchedMovieDetail failed', error)
      } finally {
        this.loading = false
      }
    }
  }
})
