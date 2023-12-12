export interface ResponseValue {
  Search: Search[]
  totalResults: string
  Response: string
  Error?: string
}
export type Search = {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface searchMoviePayload {
  movieName: string
  page?: number
}
export interface movieDetailPayload {
  id: string
  plot?: 'short' | 'full'
}

export interface Movie {
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

export const currentMovie: Movie = {
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

export const movies: ResponseValue = {
  Search: [],
  totalResults: '',
  Response: '',
  Error: ''
}
